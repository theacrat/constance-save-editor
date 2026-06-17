import type { BuildGroupsBaseParams } from "@/components/save-editor/tabs/build-primary-groups";
import type { FieldGroup, FieldItem } from "@/types/save-editor";
import type { FieldKind, FieldDefinition } from "@/types/save-editor/tabs";

import { BaseFieldControl } from "./base-controls";

interface BuildBaseItemParams {
	buildGroupBaseParams: BuildGroupsBaseParams;
	def: FieldDefinition;
	defaultKind: FieldKind;
}

function buildBaseItem({
	buildGroupBaseParams,
	def,
	defaultKind,
}: BuildBaseItemParams): FieldItem {
	const { entryMap, onUpdateJson } = buildGroupBaseParams;

	const entry = entryMap.get(def.id);

	return {
		control: (
			<BaseFieldControl
				defaultKind={defaultKind}
				def={def}
				entry={entry}
				onUpdateJson={onUpdateJson}
			/>
		),
		def,
		key: def.id,
	};
}

interface BuildBaseGroupParams {
	buildGroupBaseParams: BuildGroupsBaseParams;
	title: string;
	definitions: FieldDefinition[];
	defaultKind: FieldKind;
	description?: string;
}

function buildBaseGroup({
	buildGroupBaseParams,
	title,
	definitions,
	defaultKind,
	description,
}: BuildBaseGroupParams): FieldGroup {
	return {
		description,
		items: definitions.map((def) =>
			buildBaseItem({ buildGroupBaseParams, def, defaultKind }),
		),
		title,
	};
}

export { buildBaseGroup, buildBaseItem };
