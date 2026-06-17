import { useCallback, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import {
	decodeSave,
	encodeSave,
	stringifyJsonBytes,
	stringifyPrettyJsonBytes,
} from "@/utils/con-codec";
import type { SaveArchive } from "@/utils/con-codec";
import { recalculateCollectibleCounts } from "@/utils/save-editor/collectible-counts.ts";
import { downloadBytes, stripExtension } from "@/utils/save-editor/download.ts";
import type { JsonUploadState } from "@/utils/save-editor/file-status";
import { isJsonObject } from "@/utils/save-editor/json.ts";
import type { JsonObject } from "@/utils/save-editor/json.ts";

import { EditorFrame } from "./editor-frame";
import type { EditorPageProps } from "./editor-frame";

interface DownloadJsonParams {
	jsonDocument: unknown;
	saveFileName: string | undefined;
}

function useDownloadJson({ jsonDocument, saveFileName }: DownloadJsonParams) {
	return useCallback(() => {
		if (jsonDocument) {
			downloadBytes({
				bytes: stringifyPrettyJsonBytes(jsonDocument),
				fileName: `${stripExtension(saveFileName ?? "save")}.json`,
				type: "application/json;charset=utf-8",
			});
		}
	}, [jsonDocument, saveFileName]);
}

interface DownloadRepackedSaveParams {
	archive: SaveArchive | undefined;
	jsonUpload: JsonUploadState;
	saveFileName: string | undefined;
}

function useDownloadRepackedSave({
	archive,
	jsonUpload,
	saveFileName,
}: DownloadRepackedSaveParams) {
	return useCallback(() => {
		if (archive && jsonUpload.status === "valid") {
			downloadBytes({
				bytes: encodeSave({
					...archive,
					json: jsonUpload.value,
					jsonBytes: stringifyJsonBytes(jsonUpload.value),
				}),
				fileName: `${stripExtension(saveFileName ?? "ConSaveSlot1_1")}-edited.save`,
				type: "application/octet-stream",
			});
		}
	}, [archive, jsonUpload, saveFileName]);
}

function useReadJson(setJsonUpload: Dispatch<SetStateAction<JsonUploadState>>) {
	return useCallback(
		async (file: File) => {
			try {
				const value: unknown = JSON.parse(await file.text());
				setJsonUpload({
					fileName: file.name,
					source: "upload",
					status: "valid",
					value,
				});
			} catch (error) {
				setJsonUpload({
					fileName: file.name,
					message: error instanceof Error ? error.message : String(error),
					status: "invalid",
				});
			}
		},
		[setJsonUpload],
	);
}

interface ReadSaveSetters {
	setArchive: Dispatch<SetStateAction<SaveArchive | undefined>>;
	setJsonUpload: Dispatch<SetStateAction<JsonUploadState>>;
	setSaveError: Dispatch<SetStateAction<string | undefined>>;
	setSaveFileName: Dispatch<SetStateAction<string | undefined>>;
}

function useReadSave({
	setArchive,
	setJsonUpload,
	setSaveError,
	setSaveFileName,
}: ReadSaveSetters) {
	return useCallback(
		async (file: File) => {
			try {
				const nextArchive = decodeSave(
					new Uint8Array(await file.arrayBuffer()),
				);
				setArchive(nextArchive);
				setSaveFileName(file.name);
				setSaveError(undefined);
				setJsonUpload({ status: "idle" });
			} catch (error) {
				setArchive(undefined);
				setSaveFileName(undefined);
				setSaveError(error instanceof Error ? error.message : String(error));
			}
		},
		[setArchive, setJsonUpload, setSaveError, setSaveFileName],
	);
}

interface UpdateJsonDocumentParams {
	jsonDocument: unknown;
	jsonUpload: JsonUploadState;
	saveFileName: string | undefined;
	setJsonUpload: Dispatch<SetStateAction<JsonUploadState>>;
}

function useUpdateJsonDocument({
	jsonDocument,
	jsonUpload,
	saveFileName,
	setJsonUpload,
}: UpdateJsonDocumentParams) {
	return useCallback(
		(update: (draft: JsonObject) => void) => {
			if (!isJsonObject(jsonDocument)) {
				return;
			}

			const draft = structuredClone(jsonDocument);
			update(draft);
			if (jsonUpload.status !== "valid" || jsonUpload.source === "edit") {
				recalculateCollectibleCounts(draft);
			}
			setJsonUpload({
				fileName: `${stripExtension(saveFileName ?? "save")}.json`,
				source: jsonUpload.status === "valid" ? jsonUpload.source : "edit",
				status: "valid",
				value: draft,
			});
		},
		[jsonDocument, jsonUpload, saveFileName, setJsonUpload],
	);
}

function useSaveEditorState(): EditorPageProps {
	const [archive, setArchive] = useState<SaveArchive>();
	const [saveFileName, setSaveFileName] = useState<string>();
	const [saveError, setSaveError] = useState<string>();
	const [jsonUpload, setJsonUpload] = useState<JsonUploadState>({
		status: "idle",
	});
	const jsonDocument =
		jsonUpload.status === "valid" ? jsonUpload.value : archive?.json;

	return {
		archive,
		jsonDocument,
		jsonUpload,
		onDownloadJson: useDownloadJson({ jsonDocument, saveFileName }),
		onDownloadSave: useDownloadRepackedSave({
			archive,
			jsonUpload,
			saveFileName,
		}),
		onJsonFile: useReadJson(setJsonUpload),
		onSaveFile: useReadSave({
			setArchive,
			setJsonUpload,
			setSaveError,
			setSaveFileName,
		}),
		onUpdateJson: useUpdateJsonDocument({
			jsonDocument,
			jsonUpload,
			saveFileName,
			setJsonUpload,
		}),
		saveError,
		saveFileName,
	};
}

function SaveEditor() {
	const props = useSaveEditorState();

	return (
		<EditorFrame
			archive={props.archive}
			jsonDocument={props.jsonDocument}
			jsonUpload={props.jsonUpload}
			onDownloadJson={props.onDownloadJson}
			onDownloadSave={props.onDownloadSave}
			onJsonFile={props.onJsonFile}
			onSaveFile={props.onSaveFile}
			onUpdateJson={props.onUpdateJson}
			saveError={props.saveError}
			saveFileName={props.saveFileName}
		/>
	);
}

export { SaveEditor };
