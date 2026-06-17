import { InspirationControl } from "@/components/save-editor/controls/inspiration-control";
import type { FieldGroup, FieldItem } from "@/types/save-editor";
import type { EntryDefinition } from "@/types/save-editor/tabs";

import type { BuildGroupsBaseParams } from "./build-primary-groups";

interface InspirationDefinition extends EntryDefinition {
	inspirationId: string;
}

const inspirationEntries: InspirationDefinition[] = [
	{
		inspirationId: "Copycat",
		location: "A10",
		name: "Copycat",
		subtitle: "Favor reward - Ghostly Whispers",
	},
	{
		inspirationId: "DarkLightning",
		name: "Dark Embrace",
		subtitle: "Chest loot - defeat 1 boss after Brian",
	},
	{
		inspirationId: "DarkRevival",
		location: "J04",
		name: "Dark Revival",
		subtitle: "Favor reward - Pawprints",
	},
	{
		inspirationId: "PotionSynthesizer",
		location: "J04",
		name: "Extra Beat",
		subtitle: "Favor reward - Family Business",
	},
	{
		inspirationId: "StabLifesteal",
		location: "F28",
		name: "Lifeline",
	},
	{
		inspirationId: "StabProjectile",
		location: "J12",
		name: "Master Spear",
		subtitle: "Favor reward - A Phone Call Away",
	},
	{
		inspirationId: "MilkshakeRemix",
		location: "F20",
		name: "Milkshake Remix",
	},
	{
		inspirationId: "SliceConductor",
		location: "C04",
		name: "Paint Conductor",
	},
	{
		inspirationId: "PaintOverload",
		location: "V23",
		name: "Paint Overload",
	},
	{
		inspirationId: "PotentPotion",
		location: "A01",
		name: "Potent Potion",
	},
	{
		inspirationId: "NaturalTwenty",
		location: "J01",
		name: "Precision Brush",
	},
	{
		inspirationId: "PogoWave",
		location: "J16",
		name: "Ripple Effect",
	},
	{
		inspirationId: "ScrewJump",
		location: "P03",
		name: "Saw Jump",
	},
	{
		inspirationId: "TaxRefund",
		location: "F17",
		name: "Tax Refund",
	},
	{
		inspirationId: "SturdyKnight",
		location: "A29",
		name: "Warrior Pose",
	},
	{
		inspirationId: "TeleportClone",
		location: "V13",
		name: "Whiplash",
	},
];

interface BuildInspirationItemParams {
	buildInspirationsGroupParams: BuildInspirationsGroupParams;
	def: InspirationDefinition;
}

function buildInspirationItem({
	buildInspirationsGroupParams,
	def,
}: BuildInspirationItemParams): FieldItem {
	const { entryMap, onUpdateJson } = buildInspirationsGroupParams;

	const baseId = `ps_inspDrawing_${def.inspirationId}`;
	const upgradedId = `${baseId}_Upgraded`;
	const hasUpgradeField = entryMap.has(upgradedId);
	const baseEntry = entryMap.get(baseId);
	const upgradedEntry = entryMap.get(upgradedId);

	return {
		control: (
			<InspirationControl
				baseEntry={baseEntry}
				def={def}
				hasUpgradeField={hasUpgradeField}
				onUpdateJson={onUpdateJson}
				upgradedEntry={upgradedEntry}
			/>
		),
		def,
		key: `insp-${def.inspirationId}`,
	};
}

type BuildInspirationsGroupParams = BuildGroupsBaseParams;

function buildInspirationsGroup(
	params: BuildInspirationsGroupParams,
): FieldGroup {
	return {
		description:
			"Setting an inspiration to not obtained removes its placed slot entry if present.",
		items: inspirationEntries.map((def) =>
			buildInspirationItem({ buildInspirationsGroupParams: params, def }),
		),
		title: "Inspirations",
	};
}

export { buildInspirationsGroup };
