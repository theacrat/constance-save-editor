import type { WorldEntry } from "@/utils/save-editor/world-entries";

type FieldKind =
	| "boolean"
	| "boolean-like"
	| "number"
	| "select"
	| "text"
	| "threshold";

interface EntryDefinition {
	name: string;
	location?: string | undefined;
	subtitle?: string | undefined;
}

interface FieldDefinition extends EntryDefinition {
	id: string;
	kind?: FieldKind;
	delta?: { amount: number; targetId: string };
	mirrorIds?: string[];
	options?: { label: string; value: string }[];
	threshold?: number;
}

type EntryMap = Map<string, WorldEntry>;

export type { EntryDefinition, EntryMap, FieldKind, FieldDefinition };
