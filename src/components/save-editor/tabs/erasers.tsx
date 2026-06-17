import { buildBaseGroup } from "@/components/save-editor/controls/entry-controls";
import type { FieldGroup } from "@/types/save-editor";
import type { FieldDefinition } from "@/types/save-editor/tabs";

import type { BuildGroupsBaseParams } from "./build-primary-groups";

const startingEraserCount = 1;

const eraserEntries: FieldDefinition[] = [
	{
		id: "ps_Prod_V02_2fd1a020-0e9c-4d67-8bb3-8b1aa4692d57",
		location: "V02",
		name: "Eraser",
	},
	{
		id: "ps_gacha_RewardEraser",
		kind: "boolean-like",
		location: "C03",
		name: "Eraser",
		subtitle: "Gacha reward",
	},
	{
		id: "ps_quest_Bertram_status",
		kind: "threshold",
		location: "J04",
		name: "Eraser",
		subtitle: "Favor reward - Bubble Trouble",
		threshold: 2,
	},
	{
		id: "ps_shopItem_Eraser1",
		kind: "boolean-like",
		location: "J04",
		name: "Eraser",
		subtitle: "Shop purchase",
	},
	{
		id: "ps_LootBag_loot_MiniBossEraser",
		kind: "boolean-like",
		name: "Eraser",
		subtitle: "Chest loot - defeat 3 bosses after Brian",
	},
];

type BuildErasersGroupParams = BuildGroupsBaseParams;

function buildErasersGroup(params: BuildErasersGroupParams): FieldGroup {
	return buildBaseGroup({
		buildGroupBaseParams: params,
		defaultKind: "boolean",
		definitions: eraserEntries,
		title: "Erasers",
	});
}

export { buildErasersGroup, eraserEntries, startingEraserCount };
