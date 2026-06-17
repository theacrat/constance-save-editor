import { isJsonObject } from "./json";
import type { JsonObject } from "./json";

interface WorldEntry {
	id: string;
	value: string;
	timestamp?: number;
}

function isWorldEntry(value: unknown): value is WorldEntry {
	return (
		isJsonObject(value) &&
		typeof value["id"] === "string" &&
		typeof value["value"] === "string"
	);
}

function parseBooleanValue(value: string | undefined) {
	return value === "B1";
}

function parseNumberValue(value: string | undefined) {
	if (!value || !/^[IF]-?\d+(?:\.\d+)?$/u.test(value)) {
		return 0;
	}

	return Number(value.slice(1));
}

function getWorldEntries(jsonDocument: JsonObject) {
	const world = jsonDocument["World"];

	if (!isJsonObject(world) || !Array.isArray(world["Data"])) {
		return;
	}

	return world["Data"].filter(isWorldEntry);
}

interface GetWorldEntryValueParams {
	id: string;
	jsonDocument: JsonObject;
}

function getWorldEntryValue({ id, jsonDocument }: GetWorldEntryValueParams) {
	return getWorldEntries(jsonDocument)?.find((entry) => entry.id === id)?.value;
}

interface SetWorldEntryValueParams {
	id: string;
	jsonDocument: JsonObject;
	value: string;
}

function setWorldEntryValue({
	id,
	jsonDocument,
	value,
}: SetWorldEntryValueParams) {
	const world = jsonDocument["World"];
	if (!isJsonObject(world)) {
		return;
	}

	if (!Array.isArray(world["Data"])) {
		world["Data"] = [];
	}

	const data = Array.isArray(world["Data"]) ? world["Data"] : [];
	const entry = data.find(
		(item): item is WorldEntry => isWorldEntry(item) && item.id === id,
	);
	if (entry) {
		entry.value = value;
		return;
	}

	data.push({ id, timestamp: 0, value });
}

interface RemoveWorldEntryParams {
	id: string;
	jsonDocument: JsonObject;
}

function removeWorldEntry({ id, jsonDocument }: RemoveWorldEntryParams) {
	const world = jsonDocument["World"];
	if (!isJsonObject(world) || !Array.isArray(world["Data"])) {
		return;
	}

	world["Data"] = world["Data"].filter(
		(item) => !isWorldEntry(item) || item.id !== id,
	);
}

function parseValueType(value: string | undefined) {
	return value?.slice(0, 1);
}

function parseBooleanLikeValue(value: string) {
	return value.startsWith("B")
		? parseBooleanValue(value)
		: parseNumberValue(value) > 0;
}

interface IsCollectibleFlagSetParams {
	threshold: number | undefined;
	value: string | undefined;
}

function isCollectibleFlagSet({
	threshold,
	value,
}: IsCollectibleFlagSetParams): boolean {
	if (threshold !== undefined) {
		return parseNumberValue(value) >= threshold;
	}

	return parseBooleanLikeValue(value ?? "");
}

interface CountCollectedFlagsParams {
	entryMap: Map<string, WorldEntry>;
	flags: { id: string; threshold?: number }[];
}

function countCollectedFlags({
	entryMap,
	flags,
}: CountCollectedFlagsParams): number {
	return flags.filter((flag) =>
		isCollectibleFlagSet({
			threshold: flag.threshold,
			value: entryMap.get(flag.id)?.value,
		}),
	).length;
}

export {
	countCollectedFlags,
	getWorldEntries,
	getWorldEntryValue,
	isCollectibleFlagSet,
	parseBooleanLikeValue,
	parseBooleanValue,
	parseNumberValue,
	parseValueType,
	removeWorldEntry,
	setWorldEntryValue,
};
export type { WorldEntry };
