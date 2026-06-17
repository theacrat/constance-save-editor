// oxlint-disable import/no-nodejs-modules
import { mkdir } from "node:fs/promises";
import nodePath from "node:path";

import {
	decodeSave,
	encodeSave,
	getJsonPath,
	hasEncryptedHeader,
	parseJsonBytes,
	parseJsonValue,
	setJsonPath,
	stringifyJson,
	stringifyJsonBytes,
	stringifyPrettyJsonBytes,
} from "./con-codec";
import type { SaveArchive } from "./con-codec";

async function readSaveFile(filePath: string): Promise<SaveArchive> {
	return decodeSave(new Uint8Array(await Bun.file(filePath).arrayBuffer()));
}

interface WriteSaveFileParams {
	archive: SaveArchive;
	filePath: string;
}

async function writeSaveFile({
	archive,
	filePath,
}: WriteSaveFileParams): Promise<void> {
	await mkdir(nodePath.dirname(filePath), { recursive: true });
	await Bun.write(filePath, encodeSave(archive));
}

interface UnpackSaveParams {
	input: string;
	outputDir: string;
}

async function unpackSave({
	input,
	outputDir,
}: UnpackSaveParams): Promise<void> {
	const archive = await readSaveFile(input);
	await mkdir(outputDir, { recursive: true });

	await Promise.all(
		Object.entries(archive.entries).map(async ([name, bytes]) =>
			Bun.write(
				nodePath.join(outputDir, name),
				name === "save.json" ? stringifyPrettyJsonBytes(archive.json) : bytes,
			),
		),
	);
}

interface PackSaveParams {
	inputDir: string;
	output: string;
}

async function packSave({ inputDir, output }: PackSaveParams): Promise<void> {
	const entries: Record<string, Uint8Array> = {};

	await Promise.all(
		["save.json", "eventlog.bin", "mapfog.bin"].map(async (name) => {
			const file = Bun.file(nodePath.join(inputDir, name));
			if (await file.exists()) {
				entries[name] = new Uint8Array(await file.arrayBuffer());
			}
		}),
	);

	if (!entries["save.json"]) {
		throw new Error(`${inputDir} does not contain save.json`);
	}

	const archive: SaveArchive = {
		encrypted: true,
		entries,
		json: parseJsonBytes(entries["save.json"]),
		jsonBytes: stringifyJsonBytes(parseJsonBytes(entries["save.json"])),
	};

	await writeSaveFile({ archive, filePath: output });
}

export {
	decodeSave,
	encodeSave,
	getJsonPath,
	hasEncryptedHeader,
	packSave,
	parseJsonValue,
	readSaveFile,
	setJsonPath,
	stringifyJson,
	stringifyJsonBytes,
	stringifyPrettyJsonBytes,
	unpackSave,
	writeSaveFile,
};
export type { SaveArchive };
