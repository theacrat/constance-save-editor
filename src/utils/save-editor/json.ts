type JsonObject = Record<string, unknown>;

type JsonUpdate = (update: (draft: JsonObject) => void) => void;

function isJsonObject(value: unknown): value is JsonObject {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

export { isJsonObject };
export type { JsonObject, JsonUpdate };
