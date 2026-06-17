import { buildBaseGroup } from "@/components/save-editor/controls/entry-controls";
import type { FieldDefinition } from "@/types/save-editor/tabs";

import type { BuildGroupsBaseParams } from "./build-primary-groups";

const brushTechniqueEntries: FieldDefinition[] = [
	{ id: "ps_unlock_Ability_BombClone", location: "A24", name: "Paint Clone" },
	{ id: "ps_unlock_Ability_Dash", location: "V08", name: "Paint Dive" },
	{ id: "ps_unlock_Ability_Stab", location: "F01", name: "Paint Stab" },
	{ id: "ps_unlock_Ability_Slice", location: "A06", name: "Paint Stroke" },
	{ id: "ps_unlock_Ability_Pogo", location: "C02", name: "Plunge" },
	{ id: "ps_unlock_Ability_DoubleJump", location: "F27", name: "Somersault" },
	{ id: "ps_unlock_Ability_WallDive", location: "V13", name: "Wall Dive" },
	{ id: "ps_unlock_FridaMask", location: "V01", name: "Visage of Hope" },
];

type BuildBrushTechniquesGroup = BuildGroupsBaseParams;

function buildBrushTechniquesGroup(params: BuildBrushTechniquesGroup) {
	return buildBaseGroup({
		buildGroupBaseParams: params,
		defaultKind: "boolean-like",
		definitions: brushTechniqueEntries,
		title: "Brush Techniques",
	});
}

export { buildBrushTechniquesGroup };
