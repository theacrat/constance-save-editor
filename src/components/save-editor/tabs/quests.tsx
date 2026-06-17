import { QuestControl } from "@/components/save-editor/controls/quest-control";
import type { FieldGroup, FieldItem } from "@/types/save-editor";
import type { EntryDefinition } from "@/types/save-editor/tabs";

import type { BuildGroupsBaseParams } from "./build-primary-groups";

interface QuestDefinition extends EntryDefinition {
	questId: string;
}

const questEntries: QuestDefinition[] = [
	{ name: "Foundry", questId: "Foundry" },
	{ name: "Carnival", questId: "Carnival" },
	{ name: "Academy", questId: "Academy" },
	{ name: "Peak", questId: "Peak" },
	{ name: "Vaults", questId: "Vaults" },
	{ location: "A10", name: "Ghostly Whispers", questId: "SnapshotGhosts" },
	{ location: "J12", name: "A Phone Call Away", questId: "PhoneBooth" },
	{ location: "J04", name: "Family Business", questId: "ShopKeeper" },
	{ location: "V13", name: "Bubble Trouble", questId: "Bertram" },
	{ location: "C03", name: "Spin, Spin, Spin", questId: "Jackie" },
	{ location: "J04", name: "Pawprints", questId: "FindLupin" },
];

interface BuildQuestItemParams {
	buildGroupsBaseParams: BuildGroupsBaseParams;
	def: QuestDefinition;
}

function buildQuestItem({
	buildGroupsBaseParams,
	def,
}: BuildQuestItemParams): FieldItem {
	const { entryMap, onUpdateJson } = buildGroupsBaseParams;

	const intelId = `ps_quest_${def.questId}_intel`;
	const statusId = `ps_quest_${def.questId}_status`;
	const intelEntry = entryMap.get(intelId);
	const statusEntry = entryMap.get(statusId);

	return {
		control: (
			<QuestControl
				def={def}
				intelEntry={intelEntry}
				onUpdateJson={onUpdateJson}
				statusEntry={statusEntry}
			/>
		),
		def,
		key: `quest-${def.questId}`,
	};
}

type BuildQuestsGroupParams = BuildGroupsBaseParams;

function buildQuestsGroup(params: BuildQuestsGroupParams): FieldGroup {
	return {
		items: questEntries.map((def) =>
			buildQuestItem({ buildGroupsBaseParams: params, def }),
		),
		title: "Quests & Favors",
	};
}

export { buildQuestsGroup };
