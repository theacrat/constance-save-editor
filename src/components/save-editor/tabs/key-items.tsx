import { buildBaseGroup } from "@/components/save-editor/controls/entry-controls";
import type { FieldDefinition } from "@/types/save-editor/tabs";

import type { BuildGroupsBaseParams } from "./build-primary-groups";

const healthVialEntries: FieldDefinition[] = [
	{
		id: "ps_shopItem_Potion1",
		location: "J04",
		name: "Health Vial 1",
		subtitle: "Shop purchase",
	},
	{
		id: "ps_shopItem_Potion2",
		location: "J04",
		name: "Health Vial 2",
		subtitle: "Shop purchase",
	},
];

const keyItemEntries: FieldDefinition[] = [
	// { id: "ps_unlock_Persevere", name: "Persevere" },
	{
		id: "ps_unlock_Ability_Brush",
		location: "V01",
		name: "Paintbrush",
	},
	{
		id: "ps_unlock_Map",
		location: "V06",
		name: "Map",
	},
	{
		delta: { amount: 5, targetId: "ps_item_Polaroid" },
		id: "ps_unlock_Camera",
		location: "F01",
		name: "Camera",
	},
	{
		id: "ps_unlock_MapIcons",
		location: "J04",
		mirrorIds: ["ps_shopItem_MapIcons"],
		name: "Map Icons",
		subtitle: "Shop purchase",
	},
	{
		id: "ps_unlock_ArchitectsBlueprint",
		location: "J04",
		mirrorIds: ["ps_shopItem_ArchitectsBlueprint"],
		name: "Architect's Blueprint",
		subtitle: "Shop purchase",
	},
	{
		id: "ps_unlock_UnstableBubble",
		location: "J04",
		mirrorIds: ["ps_shopItem_UnstableBubble"],
		name: "Unstable Bubble",
		subtitle: "Shop purchase",
	},
	...healthVialEntries,
];

type BuildKeyItemsGroupParams = BuildGroupsBaseParams;

function buildKeyItemsGroup(params: BuildKeyItemsGroupParams) {
	return buildBaseGroup({
		buildGroupBaseParams: params,
		defaultKind: "boolean-like",
		definitions: keyItemEntries,
		title: "Key Items",
	});
}

export { buildKeyItemsGroup, healthVialEntries };
