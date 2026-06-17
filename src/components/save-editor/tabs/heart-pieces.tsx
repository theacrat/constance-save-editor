import { buildBaseGroup } from "@/components/save-editor/controls/entry-controls";
import type { FieldGroup } from "@/types/save-editor";
import type { FieldDefinition } from "@/types/save-editor/tabs";

import type { BuildGroupsBaseParams } from "./build-primary-groups";

const heartPieceEntries: FieldDefinition[] = [
	{
		id: "ps_Prod_A08_e8fc9b3c-2043-468a-bc67-a41a870af851",
		location: "A08",
		name: "Heart Piece",
	},
	{
		id: "ps_Prod_A21_33c01c49-420f-4d00-a8e6-aa08d85e22cd",
		location: "A21",
		name: "Heart Piece",
	},
	{
		id: "ps_Prod_C02_7b22ed75-fabf-4bc7-9a2c-1541853f84d9",
		location: "C02",
		name: "Heart Piece",
		subtitle: "Chest loot",
	},
	{
		id: "ps_gacha_RewardHeartPiece",
		kind: "boolean-like",
		location: "C03",
		name: "Heart Piece",
		subtitle: "Gacha reward",
	},
	{
		id: "ps_Prod_F02_cc06e08a-23b9-4cc9-ab1e-e4795e51419e",
		location: "F02",
		name: "Heart Piece",
		subtitle: "Chest loot",
	},
	{
		id: "ps_Prod_F12_b7318b60-261b-49fc-8971-6dd3c33e79d3",
		location: "F12",
		name: "Heart Piece",
		subtitle: "Chest loot",
	},
	{
		id: "ps_shopItem_HeartPiece1",
		kind: "boolean-like",
		location: "J04",
		name: "Heart Piece",
		subtitle: "Shop purchase",
	},
	{
		id: "ps_Prod_V07_fab7be2d-ee03-098b-46bb-cf604f33acce",
		location: "V07",
		name: "Heart Piece",
	},
	{
		id: "ps_Prod_V17_c56f2c5f-46ae-4a59-bcd9-d49eb49f053c",
		location: "V17",
		name: "Heart Piece",
	},
];

type BuildHeartPiecesGroup = BuildGroupsBaseParams;

function buildHeartPiecesGroup(params: BuildHeartPiecesGroup): FieldGroup {
	return buildBaseGroup({
		buildGroupBaseParams: params,
		defaultKind: "boolean",
		definitions: heartPieceEntries,
		title: "Heart Pieces",
	});
}

export { buildHeartPiecesGroup, heartPieceEntries };
