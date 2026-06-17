import { unzipSync, zipSync } from "fflate";

const key = new TextEncoder().encode("Xornstance!");
const utf8 = new TextDecoder("utf-8");
const utf8Encoder = new TextEncoder();
const jsonBom = new Uint8Array([0xef, 0xbb, 0xbf]);

interface SaveArchive {
	json: unknown;
	jsonBytes: Uint8Array;
	entries: Record<string, Uint8Array>;
	encrypted: boolean;
}

function parseJsonBytes(bytes: Uint8Array): unknown {
	return JSON.parse(utf8.decode(bytes).replace(/^\uFEFF/u, ""));
}

function parsePath(jsonPath: string): string[] {
	return jsonPath
		.replaceAll(/\[(?<index>\d+)\]/gu, ".$<index>")
		.split(".")
		.filter(Boolean);
}

function isJsonObject(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === "object";
}

function xorPayload(bytes: Uint8Array): Uint8Array {
	const output = new Uint8Array(bytes);
	for (let index = 0; index < output.length; index += 1) {
		const outputByte = output[index];
		const keyByte = key[index % key.length];
		if (outputByte === undefined || keyByte === undefined) {
			throw new Error("Unable to encrypt save payload");
		}

		// oxlint-disable-next-line no-bitwise
		output[index] = outputByte ^ keyByte;
	}
	return output;
}

function hasEncryptedHeader(data: Uint8Array): boolean {
	if (data.length < key.length) {
		return false;
	}
	for (let index = 0; index < key.length; index += 1) {
		if (data[index] !== key[index]) {
			return false;
		}
	}
	return true;
}

function decodeSave(data: Uint8Array): SaveArchive {
	if (!hasEncryptedHeader(data)) {
		const jsonBytes = data;
		return {
			encrypted: false,
			entries: { "save.json": jsonBytes },
			json: parseJsonBytes(jsonBytes),
			jsonBytes,
		};
	}

	const zipBytes = xorPayload(data.subarray(key.length));
	const entries = unzipSync(zipBytes);
	const jsonBytes = entries["save.json"];

	if (!jsonBytes) {
		throw new Error("save.json not found in save archive");
	}

	return {
		encrypted: true,
		entries,
		json: parseJsonBytes(jsonBytes),
		jsonBytes,
	};
}

function encodeSave(archive: SaveArchive): Uint8Array {
	const entries: Record<string, Uint8Array> = {
		...archive.entries,
		"save.json": archive.jsonBytes,
	};

	const zipBytes = zipSync(entries, { level: 9 });
	const encryptedZip = xorPayload(zipBytes);
	const output = new Uint8Array(key.length + encryptedZip.length);
	output.set(key, 0);
	output.set(encryptedZip, key.length);
	return output;
}

interface StringifyJsonParams {
	spaces?: number;
	value: unknown;
}

function stringifyJson({ spaces, value }: StringifyJsonParams): Uint8Array {
	const json = utf8Encoder.encode(JSON.stringify(value, undefined, spaces));
	const bytes = new Uint8Array(jsonBom.length + json.length);
	bytes.set(jsonBom, 0);
	bytes.set(json, jsonBom.length);
	return bytes;
}

function stringifyJsonBytes(value: unknown): Uint8Array {
	return stringifyJson({ value });
}

function stringifyPrettyJsonBytes(value: unknown): Uint8Array {
	return stringifyJson({ spaces: 2, value });
}

interface GetJsonPathParams {
	jsonPath: string;
	root: unknown;
}

function getJsonPath({ jsonPath, root }: GetJsonPathParams): unknown {
	let current = root;
	for (const segment of parsePath(jsonPath)) {
		if (!isJsonObject(current)) {
			return undefined;
		}
		current = current[segment];
	}
	return current;
}

interface SetJsonPathParams {
	jsonPath: string;
	root: unknown;
	value: unknown;
}

function setJsonPath({ jsonPath, root, value }: SetJsonPathParams): void {
	const segments = parsePath(jsonPath);
	if (segments.length === 0) {
		throw new Error("JSON path cannot be empty");
	}

	if (!isJsonObject(root)) {
		throw new TypeError("JSON path root must be an object");
	}

	let current = root;
	for (const segment of segments.slice(0, -1)) {
		const next = current[segment];
		if (!isJsonObject(next)) {
			const replacement = {};
			current[segment] = replacement;
			current = replacement;
			continue;
		}
		current = next;
	}

	const lastSegment = segments.at(-1);
	if (lastSegment === undefined) {
		throw new Error("JSON path cannot be empty");
	}
	current[lastSegment] = value;
}

function parseJsonValue(raw: string): unknown {
	try {
		return JSON.parse(raw);
	} catch {
		return raw;
	}
}

export {
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
};
export type { SaveArchive };
