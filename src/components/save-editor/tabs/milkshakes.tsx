import { buildBaseGroup } from "@/components/save-editor/controls/entry-controls";
import type { FieldGroup } from "@/types/save-editor";
import type { FieldDefinition } from "@/types/save-editor/tabs";

import type { BuildGroupsBaseParams } from "./build-primary-groups";

const milkshakeEntries: FieldDefinition[] = [
	{
		id: "ps_MilkShake_Prod_A22",
		kind: "boolean",
		location: "A22",
		name: "Milkshake",
	},
	{
		id: "ps_MilkShake_Prod_A31",
		kind: "boolean",
		location: "A31",
		name: "Milkshake",
	},
	{
		id: "ps_MilkShake_Prod_C05",
		kind: "boolean",
		location: "C05",
		name: "Milkshake",
	},
	{
		id: "ps_MilkShake_Prod_F20",
		kind: "boolean",
		location: "F20",
		name: "Milkshake",
	},
	{
		id: "ps_MilkShake_Prod_J21",
		kind: "boolean",
		location: "J21",
		name: "Milkshake",
	},
	{
		id: "ps_MilkShake_Prod_J16",
		kind: "boolean",
		location: "J16",
		name: "Milkshake",
	},
	{
		id: "ps_MilkShake_Prod_P03",
		kind: "boolean",
		location: "P03",
		name: "Milkshake",
	},
	{
		id: "ps_MilkShake_Prod_V10",
		kind: "boolean",
		location: "V10",
		name: "Milkshake",
	},
];

type BuildMilkshakesGroupParams = BuildGroupsBaseParams;

function buildMilkshakesGroup(params: BuildMilkshakesGroupParams): FieldGroup {
	return buildBaseGroup({
		buildGroupBaseParams: params,
		defaultKind: "boolean",
		definitions: milkshakeEntries,
		title: "Milkshakes",
	});
}

export { buildMilkshakesGroup };
