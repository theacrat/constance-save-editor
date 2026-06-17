import type { SaveArchive } from "@/utils/con-codec";

interface FileStatus {
	message: string;
	variant: "negative" | "neutral" | "positive";
}

type JsonUploadState =
	| { status: "idle" }
	| {
			status: "valid";
			fileName: string;
			source: "edit" | "upload";
			value: unknown;
	  }
	| { status: "invalid"; fileName: string; message: string };

interface SaveStatusParams {
	archive: SaveArchive | undefined;
	error: string | undefined;
	fileName: string | undefined;
}

function saveStatus({
	archive,
	error,
	fileName,
}: SaveStatusParams): FileStatus {
	if (error) {
		return { message: "Invalid save file", variant: "negative" };
	}

	if (!archive) {
		return { message: "", variant: "neutral" };
	}

	return {
		message: fileName ?? "Save loaded",
		variant: "positive",
	};
}

function jsonStatus(upload: JsonUploadState): FileStatus {
	if (upload.status === "valid") {
		return { message: "", variant: "positive" };
	}

	if (upload.status === "invalid") {
		return {
			message: `Invalid JSON`,
			variant: "negative",
		};
	}

	return { message: "", variant: "neutral" };
}

export { jsonStatus, saveStatus };
export type { FileStatus, JsonUploadState };
