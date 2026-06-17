import { Button } from "@react-spectrum/s2/Button";
import { FileTrigger } from "@react-spectrum/s2/FileTrigger";
import { Heading } from "@react-spectrum/s2/Heading";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useCallback } from "react";

import type { SaveArchive } from "@/utils/con-codec";
import { jsonStatus, saveStatus } from "@/utils/save-editor/file-status";
import type {
	FileStatus,
	JsonUploadState,
} from "@/utils/save-editor/file-status";

const jsonFileTypes = [".json", "application/json"];
const saveFileTypes = [".save"];

const statusStyles = style({
	color: {
		default: "detail",
		isNegative: "negative",
	},
	fontSize: "detail",
	fontWeight: "detail",
	lineHeight: "detail",
});

interface FileDetailsProps {
	status: FileStatus;
	title: string;
}

function FileDetails({ status, title }: FileDetailsProps) {
	const isNegative = status.variant === "negative";

	return (
		<div>
			<span
				className={style({
					marginTop: 0,
				})}
			>
				{title}
			</span>
			<br />
			{status.message ? (
				<span className={statusStyles({ isNegative })}>{status.message}</span>
			) : undefined}
		</div>
	);
}

interface FilePickerProps {
	acceptedFileTypes: string[];
	buttonLabel: string;
	isDisabled?: boolean;
	onSelect: (files: FileList | null) => void;
}

function FilePicker({
	acceptedFileTypes,
	buttonLabel,
	isDisabled = false,
	onSelect,
}: FilePickerProps) {
	return (
		<FileTrigger acceptedFileTypes={acceptedFileTypes} onSelect={onSelect}>
			<Button isDisabled={isDisabled} styles={style({ flexShrink: 0 })}>
				{buttonLabel}
			</Button>
		</FileTrigger>
	);
}

interface FileActionsProps {
	acceptedFileTypes: string[];
	isChooseDisabled: boolean;
	isDownloadDisabled: boolean;
	onDownload: () => void;
	onSelect: (files: FileList | null) => void;
}

function FileActions({
	acceptedFileTypes,
	isChooseDisabled,
	isDownloadDisabled,
	onDownload,
	onSelect,
}: FileActionsProps) {
	return (
		<div
			className={style({
				display: "flex",
				flexWrap: "wrap",
				gap: 8,
				justifyContent: "end",
			})}
		>
			<FilePicker
				acceptedFileTypes={acceptedFileTypes}
				buttonLabel="Choose"
				isDisabled={isChooseDisabled}
				onSelect={onSelect}
			/>
			<Button
				isDisabled={isDownloadDisabled}
				onPress={onDownload}
				variant="primary"
			>
				Download
			</Button>
		</div>
	);
}

interface FileRowProps {
	acceptedFileTypes: string[];
	isChooseDisabled?: boolean;
	isDownloadDisabled?: boolean;
	onDownload: () => void;
	onSelect: (file: File) => Promise<void>;
	status: FileStatus;
	title: string;
}

function FileRow({
	acceptedFileTypes,
	isChooseDisabled = false,
	isDownloadDisabled = false,
	onDownload,
	onSelect,
	status,
	title,
}: FileRowProps) {
	const handleSelect = useCallback(
		(files: FileList | null) => {
			const file = files?.[0];
			if (file) {
				void onSelect(file);
			}
		},
		[onSelect],
	);

	return (
		<div
			className={style({
				alignItems: "start",
				display: "grid",
				gap: 16,
				gridTemplateColumns: "minmax(0, 1fr) auto",
			})}
		>
			<FileDetails status={status} title={title} />
			<FileActions
				acceptedFileTypes={acceptedFileTypes}
				isChooseDisabled={isChooseDisabled}
				isDownloadDisabled={isDownloadDisabled}
				onDownload={onDownload}
				onSelect={handleSelect}
			/>
		</div>
	);
}

interface WorkflowPanelProps {
	archive?: SaveArchive | undefined;
	jsonUpload: JsonUploadState;
	onDownloadJson: () => void;
	onDownloadSave: () => void;
	onJsonFile: (file: File) => Promise<void>;
	onSaveFile: (file: File) => Promise<void>;
	saveError?: string | undefined;
	saveFileName?: string | undefined;
}

function SaveRow(props: WorkflowPanelProps) {
	return (
		<FileRow
			acceptedFileTypes={saveFileTypes}
			isDownloadDisabled={!props.archive || props.jsonUpload.status !== "valid"}
			onDownload={props.onDownloadSave}
			onSelect={props.onSaveFile}
			status={saveStatus({
				archive: props.archive,
				error: props.saveError,
				fileName: props.saveFileName,
			})}
			title="Save file"
		/>
	);
}

function JsonRow(props: WorkflowPanelProps) {
	return (
		<FileRow
			acceptedFileTypes={jsonFileTypes}
			isChooseDisabled={!props.archive}
			isDownloadDisabled={!props.archive}
			onDownload={props.onDownloadJson}
			onSelect={props.onJsonFile}
			status={jsonStatus(props.jsonUpload)}
			title="Raw JSON"
		/>
	);
}

function WorkflowRows(props: WorkflowPanelProps) {
	return (
		<div
			className={style({
				display: "flex",
				flexDirection: "column",
				gap: 16,
			})}
		>
			<Heading
				level={2}
				styles={style({
					font: "heading",
					marginTop: 0,
				})}
			>
				Save
			</Heading>
			<SaveRow
				archive={props.archive}
				jsonUpload={props.jsonUpload}
				onDownloadJson={props.onDownloadJson}
				onDownloadSave={props.onDownloadSave}
				onJsonFile={props.onJsonFile}
				onSaveFile={props.onSaveFile}
				saveError={props.saveError}
				saveFileName={props.saveFileName}
			/>
			{props.saveFileName && (
				<JsonRow
					archive={props.archive}
					jsonUpload={props.jsonUpload}
					onDownloadJson={props.onDownloadJson}
					onDownloadSave={props.onDownloadSave}
					onJsonFile={props.onJsonFile}
					onSaveFile={props.onSaveFile}
					saveError={props.saveError}
					saveFileName={props.saveFileName}
				/>
			)}
		</div>
	);
}

function WorkflowPanel(props: WorkflowPanelProps) {
	return (
		<div
			className={style({
				backgroundColor: "layer-1",
				borderColor: "transparent-black-75",
				borderRadius: "sm",
				borderStyle: "solid",
				borderWidth: 1,
				minWidth: 160,
				padding: 16,
				textAlign: "start",
			})}
		>
			<WorkflowRows
				archive={props.archive}
				jsonUpload={props.jsonUpload}
				onDownloadJson={props.onDownloadJson}
				onDownloadSave={props.onDownloadSave}
				onJsonFile={props.onJsonFile}
				onSaveFile={props.onSaveFile}
				saveError={props.saveError}
				saveFileName={props.saveFileName}
			/>
		</div>
	);
}

export { WorkflowPanel };
