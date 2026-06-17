import type { ReactNode } from "react";

import type { EntryDefinition } from "./tabs";

interface FieldGroup {
	description?: string | undefined;
	items: FieldItem[];
	title: string;
}

interface FieldItem {
	control: ReactNode;
	def: EntryDefinition;
	key: string;
}

export type { FieldGroup, FieldItem };
