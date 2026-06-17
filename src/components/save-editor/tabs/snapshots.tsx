import { buildBaseGroup } from "@/components/save-editor/controls/entry-controls";
import type { FieldGroup } from "@/types/save-editor";
import type { FieldDefinition } from "@/types/save-editor/tabs";

import type { BuildGroupsBaseParams } from "./build-primary-groups";

const snapshotCountId = "ps_item_Polaroid";

const snapshotEntries: FieldDefinition[] = [
	{
		delta: { amount: 1, targetId: snapshotCountId },
		id: "ps_shopItem_Snapshot1",
		kind: "boolean-like",
		location: "J04",
		name: "Snapshot 1",
		subtitle: "Shop purchase",
	},
	{
		delta: { amount: 1, targetId: snapshotCountId },
		id: "ps_shopItem_Snapshot2",
		kind: "boolean-like",
		location: "J04",
		name: "Snapshot 2",
		subtitle: "Shop purchase",
	},
	{
		delta: { amount: 1, targetId: snapshotCountId },
		id: "ps_shopItem_Snapshot3",
		kind: "boolean-like",
		location: "J04",
		name: "Snapshot 3",
		subtitle: "Shop purchase",
	},
	{
		delta: { amount: 3, targetId: snapshotCountId },
		id: "ps_shopItem_SnapshotPack1",
		kind: "boolean-like",
		location: "J04",
		name: "Snapshot Pack 1",
		subtitle: "Shop purchase",
	},
	{
		delta: { amount: 3, targetId: snapshotCountId },
		id: "ps_shopItem_SnapshotPack2",
		kind: "boolean-like",
		location: "J04",
		name: "Snapshot Pack 2",
		subtitle: "Shop purchase",
	},
	{
		delta: { amount: 3, targetId: snapshotCountId },
		id: "ps_Prod_J08_05ab593c-d503-41cf-b3eb-0eb89726594f",
		location: "J08",
		name: "Snapshot Pack",
		subtitle: "Chest loot",
	},
	{
		delta: { amount: 3, targetId: snapshotCountId },
		id: "ps_Prod_P03_73cee3e6-0f17-4b15-817f-476c28071c80",
		location: "P03",
		name: "Snapshot Pack",
		subtitle: "Chest loot",
	},
	{
		delta: { amount: 3, targetId: snapshotCountId },
		id: "ps_Prod_F16_a046b9c0-14bd-4053-b0ad-cef476f54daa",
		location: "F16",
		name: "Snapshot Pack",
		subtitle: "Chest loot",
	},
];

type BuildSnapshotsGroupParams = BuildGroupsBaseParams;

function buildSnapshotsGroup(params: BuildSnapshotsGroupParams): FieldGroup {
	return buildBaseGroup({
		buildGroupBaseParams: params,
		defaultKind: "boolean",
		definitions: snapshotEntries,
		title: "Snapshots",
	});
}

export { buildSnapshotsGroup };
