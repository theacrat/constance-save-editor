import { TearControl } from "@/components/save-editor/controls/tear-control";
import type { FieldGroup, FieldItem } from "@/types/save-editor";
import type { EntryDefinition, EntryMap } from "@/types/save-editor/tabs";
import type { JsonUpdate } from "@/utils/save-editor/json";

interface TearDefinition extends EntryDefinition {
	tearId: string;
}

const tearEntries: TearDefinition[] = [
	{ location: "F28", name: "Tear of Resurgance", tearId: "Foundry" },
	{ location: "C01", name: "Tear of Reflection", tearId: "Carnival" },
	{ location: "A07", name: "Tear of Relation", tearId: "Academy" },
	{ location: "V11", name: "Tear of Rememberance", tearId: "Vaults" },
];

interface BuildTearItemParams {
	def: TearDefinition;
	entryMap: EntryMap;
	onUpdateJson: JsonUpdate;
}

function buildTearItem({
	def,
	entryMap,
	onUpdateJson,
}: BuildTearItemParams): FieldItem {
	const unlockedId = `ps_unlock_Tear_${def.tearId}`;
	const revealedId = `ps_unlock_Tear_${def.tearId}_MapIconRevealed`;
	const unlockedEntry = entryMap.get(unlockedId);
	const revealedEntry = entryMap.get(revealedId);

	return {
		control: (
			<TearControl
				def={def}
				onUpdateJson={onUpdateJson}
				revealedEntry={revealedEntry}
				unlockedEntry={unlockedEntry}
			/>
		),
		def,
		key: `tear-${def.tearId}`,
	};
}

interface BuildTearsGroupParams {
	entryMap: EntryMap;
	onUpdateJson: JsonUpdate;
}

function buildTearsGroup({
	entryMap,
	onUpdateJson,
}: BuildTearsGroupParams): FieldGroup {
	return {
		items: tearEntries.map((def) =>
			buildTearItem({ def, entryMap, onUpdateJson }),
		),
		title: "Tears",
	};
}

export { buildTearsGroup };
