import { BossControl } from "@/components/save-editor/controls/boss-control";
import type { FieldGroup, FieldItem } from "@/types/save-editor";
import type { EntryDefinition } from "@/types/save-editor/tabs";

import type { BuildGroupsBaseParams } from "./build-primary-groups";

interface BossDefinition extends EntryDefinition {
	bossId: string;
}

const bossEntries: BossDefinition[] = [
	{
		bossId: "Smasher",
		location: "F21",
		name: "Cubicus",
	},
	{
		bossId: "BrainStoker",
		location: "F28",
		name: "Brian",
	},
	{
		bossId: "Palettus",
		location: "F27",
		name: "Palettus",
	},
	{
		bossId: "BossJoker",
		location: "C01",
		name: "The Jester",
	},
	{
		bossId: "JugglerBalloons",
		location: "C02",
		name: "The Manipulator",
	},
	{
		bossId: "JokerInvisible",
		location: "C04",
		name: "The Jester, Encore",
	},
	{
		bossId: "JugglerBalls",
		location: "C05",
		name: "The Manipulator, Encore",
	},
	{
		bossId: "CornelisBoss",
		location: "C01",
		name: "Cornelis",
	},
	{
		bossId: "AweKing",
		location: "A16",
		name: "Awe King",
	},
	{
		bossId: "MothQueen",
		location: "A27",
		name: "High Patia",
	},
	{
		bossId: "ChaseNemesis",
		location: "A07",
		name: "Chase Sequence",
	},
	{
		bossId: "PukeyBoy",
		location: "V18",
		name: "Sir Barfalot",
	},
	{
		bossId: "SlimeNemesis",
		location: "V11",
		name: "Lord Korba",
	},
	{
		bossId: "PuppetHandCorruption",
		location: "VD01",
		name: "Corrupted Mind",
	},
	{
		bossId: "PuppetHandStrings",
		location: "VD02",
		name: "Forsaken Will",
	},
	{
		bossId: "PuppetHandKungfu",
		location: "VD03",
		name: "Wounded Vessel",
	},
	{
		bossId: "PuppetMaster",
		location: "VD01",
		name: "Constance",
	},
];

interface BossItemProps {
	buildGroupsBaseParams: BuildGroupsBaseParams;
	def: BossDefinition;
}

function buildBossItem({
	buildGroupsBaseParams,
	def,
}: BossItemProps): FieldItem {
	const { entryMap, onUpdateJson } = buildGroupsBaseParams;

	const beatenId = `ps_Boss_${def.bossId}_Beaten`;
	const attemptsId = `ps_Boss_${def.bossId}_Attempts`;

	const beatenEntry = entryMap.get(beatenId);
	const attemptsEntry = entryMap.get(attemptsId);

	return {
		control: (
			<BossControl
				attemptsEntry={attemptsEntry}
				beatenEntry={beatenEntry}
				def={def}
				onUpdateJson={onUpdateJson}
			/>
		),
		def,
		key: `boss-${def.bossId}`,
	};
}

type BuildBossesGroupParams = BuildGroupsBaseParams;

function buildBossesGroup(params: BuildBossesGroupParams): FieldGroup {
	return {
		items: bossEntries.map((def) =>
			buildBossItem({ buildGroupsBaseParams: params, def }),
		),
		title: "Bosses",
	};
}

export { buildBossesGroup };
