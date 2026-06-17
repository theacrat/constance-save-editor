import { buildBaseGroup } from "@/components/save-editor/controls/entry-controls";
import type { FieldDefinition } from "@/types/save-editor/tabs";

import type { BuildGroupsBaseParams } from "./build-primary-groups";

const snapshotGhostStatusOptions = [
	{ label: "Missing", value: "0" },
	{ label: "Saved", value: "1" },
	{ label: "Delivered", value: "2" },
];

const favorTargetEntries: FieldDefinition[] = [
	{
		id: "ps_ShopKeeperFound_Prod_A04",
		kind: "boolean",
		location: "A04",
		name: "Cousin",
		subtitle: "Family Business",
	},
	{
		id: "ps_ShopKeeperFound_Prod_F29",
		kind: "boolean",
		location: "F29",
		name: "Cousin",
		subtitle: "Family Business",
	},
	{
		id: "ps_ShopKeeperFound_Prod_J18",
		kind: "boolean",
		location: "J18",
		name: "Cousin",
		subtitle: "Family Business",
	},
	{
		id: "ps_ShopKeeperFound_Prod_V15",
		kind: "boolean",
		location: "V15",
		name: "Cousin",
		subtitle: "Family Business",
	},
	{
		id: "ps_SnapshotGhost_Prod_A10",
		kind: "select",
		location: "A10",
		name: "Ghost",
		options: snapshotGhostStatusOptions,
		subtitle: "Ghostly Whispers",
	},
	{
		id: "ps_SnapshotGhost_Prod_A14",
		kind: "select",
		location: "A14",
		name: "Ghost",
		options: snapshotGhostStatusOptions,
		subtitle: "Ghostly Whispers",
	},
	{
		id: "ps_SnapshotGhost_Prod_A19",
		kind: "select",
		location: "A19",
		name: "Ghost",
		options: snapshotGhostStatusOptions,
		subtitle: "Ghostly Whispers",
	},
	{
		id: "ps_SnapshotGhost_Prod_A23",
		kind: "select",
		location: "A23",
		name: "Ghost",
		options: snapshotGhostStatusOptions,
		subtitle: "Ghostly Whispers",
	},
	{
		id: "ps_LupinFound_Prod_A14",
		kind: "boolean",
		location: "A14",
		name: "Lupin",
		subtitle: "Pawprints",
	},
	{
		id: "ps_LupinFound_Prod_C91",
		kind: "boolean",
		location: "C02",
		name: "Lupin",
		subtitle: "Pawprints",
	},
	{
		id: "ps_LupinFound_Prod_F08",
		kind: "boolean",
		location: "F08",
		name: "Lupin",
		subtitle: "Pawprints",
	},
	{
		id: "ps_LupinFound_Prod_V23",
		kind: "boolean",
		location: "V23",
		name: "Lupin",
		subtitle: "Pawprints",
	},
	{
		id: "ps_PhoneBoothSolved_Prod_J09",
		kind: "boolean",
		location: "J09",
		name: "Power Line",
		subtitle: "A Phone Call Away",
	},
	{
		id: "ps_PhoneBoothSolved_Prod_J12",
		kind: "boolean",
		location: "J12",
		name: "Power Line",
		subtitle: "A Phone Call Away",
	},
	{
		id: "ps_PhoneBoothSolved_Prod_J17",
		kind: "boolean",
		location: "J17",
		name: "Power Line",
		subtitle: "A Phone Call Away",
	},
	{
		id: "ps_PhoneBoothSolved_Prod_J21",
		kind: "boolean",
		location: "J21",
		name: "Power Line",
		subtitle: "A Phone Call Away",
	},
];

type BuildFavorTargetsGroupParams = BuildGroupsBaseParams;

function buildFavorTargetsGroup(params: BuildFavorTargetsGroupParams) {
	return buildBaseGroup({
		buildGroupBaseParams: params,
		defaultKind: "number",
		definitions: favorTargetEntries,
		title: "Favor Targets",
	});
}

export { buildFavorTargetsGroup };
