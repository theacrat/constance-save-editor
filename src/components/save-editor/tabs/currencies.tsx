import { buildBaseGroup } from "@/components/save-editor/controls/entry-controls";
import type { FieldGroup } from "@/types/save-editor";
import type { FieldDefinition } from "@/types/save-editor/tabs";

import type { BuildGroupsBaseParams } from "./build-primary-groups";

const currencyEntries: FieldDefinition[] = [
	{
		id: "ps_item_Currency",
		name: "Glimmer",
	},
	{
		id: "ps_item_LightStone",
		name: "Lightstones",
	},
	{
		id: "ps_gacha_RewardGlimmer",
		kind: "boolean-like",
		location: "C03",
		name: "Glimmer",
		subtitle: "Gacha reward",
	},
	{
		id: "ps_shopItem_LightStonePack1",
		kind: "boolean-like",
		location: "J04",
		name: "Handful of Lightstones 1",
		subtitle: "Shop purchase",
	},
	{
		id: "ps_shopItem_LightStonePack2",
		kind: "boolean-like",
		location: "J04",
		name: "Handful of Lightstones 2",
		subtitle: "Shop purchase",
	},
	{
		id: "ps_shopItem_LightStonePack3",
		kind: "boolean-like",
		location: "J04",
		name: "Handful of Lightstones 3",
		subtitle: "Shop purchase",
	},
];

type BuildCurrenciesGroupParams = BuildGroupsBaseParams;

function buildCurrenciesGroup(params: BuildCurrenciesGroupParams): FieldGroup {
	return buildBaseGroup({
		buildGroupBaseParams: params,
		defaultKind: "number",
		definitions: currencyEntries,
		title: "Currencies",
	});
}

export { buildCurrenciesGroup, currencyEntries };
