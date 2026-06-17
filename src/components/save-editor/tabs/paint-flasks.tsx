import { buildBaseGroup } from "@/components/save-editor/controls/entry-controls";
import type { FieldGroup } from "@/types/save-editor";
import type { FieldDefinition } from "@/types/save-editor/tabs";

import type { BuildGroupsBaseParams } from "./build-primary-groups";

const paintFlaskEntries: FieldDefinition[] = [
	{
		id: "ps_Prod_A13_812fcb32-54e8-46e1-bbe4-ae49ba218a51",
		location: "A13",
		name: "Paint Flask",
	},
	{
		id: "ps_Prod_A31_77994aa3-56cd-4897-8728-9aa02c5eca5e",
		location: "A31",
		name: "Paint Flask",
	},
	{
		id: "ps_gacha_RewardPaintPiece",
		kind: "boolean-like",
		location: "C03",
		name: "Paint Flask",
		subtitle: "Gacha reward",
	},
	{
		id: "ps_Prod_C05_2578e0d5-3e73-7f23-c5d8-9d159d1f1efc",
		location: "C05",
		name: "Paint Flask",
	},
	{
		id: "ps_Prod_F09_ce6f8b75-d99b-4749-98b4-d8fd3fa2ed83",
		location: "F09",
		name: "Paint Flask",
	},
	{
		id: "ps_Prod_F26_d40df734-d0a0-4922-b6de-a2b4c2063027",
		location: "F26",
		name: "Paint Flask",
	},
	{
		id: "ps_shopItem_PaintPiece1",
		kind: "boolean-like",
		location: "J04",
		name: "Paint Flask",
		subtitle: "Shop purchase",
	},
	{
		id: "ps_Prod_J19_dacbb823-357f-b229-30ec-3a5f372e265a",
		location: "J19",
		name: "Paint Flask",
		subtitle: "Chest loot",
	},
	{
		id: "ps_Prod_V08_47add804-cdd9-43b4-8d80-eabcfc5787b8",
		location: "V08",
		name: "Paint Flask",
		subtitle: "Chest loot",
	},
	{
		id: "ps_Prod_V10_4fe5e6c6-f0bd-40fd-846a-0496106e877f",
		location: "V10",
		name: "Paint Flask",
	},
	{
		id: "ps_Prod_V12_f34ac7b4-c509-8d7b-0ee1-952435483041",
		location: "V12",
		name: "Paint Flask",
	},
	{
		id: "ps_Prod_V24_c1739f72-f8d2-4986-8583-bc19237e180d",
		location: "V24",
		name: "Paint Flask",
	},
];

type BuildPaintFlasksGroupParams = BuildGroupsBaseParams;

function buildPaintFlasksGroup(
	params: BuildPaintFlasksGroupParams,
): FieldGroup {
	return buildBaseGroup({
		buildGroupBaseParams: params,
		defaultKind: "boolean",
		definitions: paintFlaskEntries,
		title: "Paint Flasks",
	});
}

export { buildPaintFlasksGroup, paintFlaskEntries };
