import { buildBaseGroup } from "@/components/save-editor/controls/entry-controls";
import type { FieldDefinition } from "@/types/save-editor/tabs";

import type { BuildGroupsBaseParams } from "./build-primary-groups";

const achievementEntries: FieldDefinition[] = [
	{
		id: "ps_Achievement_TearFoundry",
		name: "Resurgence",
		subtitle: "Embrace the Tear of Resurgence",
	},
	{
		id: "ps_Achievement_TearAcademy",
		name: "Relation",
		subtitle: "Embrace the Tear of Relation",
	},
	{
		id: "ps_Achievement_TearVaults",
		name: "Remembrance",
		subtitle: "Embrace the Tear of Remembrance",
	},
	{
		id: "ps_Achievement_TearCarnival",
		name: "Reflection",
		subtitle: "Embrace the Tear of Reflection",
	},
	{
		id: "ps_Achievement_PuppetMasterDefeated",
		name: "Embrace",
		subtitle: "Confront yourself",
	},
	{
		id: "ps_Achievement_GameFinished",
		name: "Acceptance",
		subtitle: "Finish the game",
	},
	{
		id: "ps_Achievement_GameFinishedSpeedrun1",
		name: "Chasing Time",
		subtitle: "Finish the game in under 6 hours",
	},
	{
		id: "ps_Achievement_GameFinishedSpeedrun2",
		name: "Defying Time",
		subtitle: "Finish the game in under 3 hours",
	},
	{
		id: "ps_Achievement_AllHeartPieces",
		name: "Resilient",
		subtitle: "Find all Heart Pieces",
	},
	{
		id: "ps_Achievement_AllPaintFlasks",
		name: "Saturated",
		subtitle: "Find all Paint Flasks",
	},
	{
		id: "ps_Achievement_CollectAllErasers",
		name: "Cleared",
		subtitle: "Collect all Erasers",
	},
	{
		id: "ps_Achievement_AllBrushTechniques",
		name: "Brush Master",
		subtitle: "Master all Brush Techniques",
	},
	{
		id: "ps_Achievement_CollectGlimmer1",
		name: "A Glimmer of Hope",
		subtitle: "Collect 1000 Glimmer",
	},
	{
		id: "ps_Achievement_CollectGlimmer2",
		name: "Full of Hope",
		subtitle: "Collect 5000 Glimmer",
	},
	{
		id: "ps_Achievement_CollectGlimmer3",
		name: "Boundless Hope",
		subtitle: "Collect 9999 Glimmer",
	},
	{
		id: "ps_Achievement_CollectLightstone1",
		name: "A Spark of Light",
		subtitle: "Collect your first Lightstone",
	},
	{
		id: "ps_Achievement_CollectLightstone2",
		name: "Radiant Light",
		subtitle: "Collect 450 Lightstones",
	},
	{
		id: "ps_Achievement_CollectLightstone3",
		name: "Eternal Light",
		subtitle: "Collect 900 Lightstones",
	},
	{
		id: "ps_Achievement_BuyAllShopItems",
		location: "J04",
		name: "Deep Pockets",
		subtitle: "Buy every item in the shop",
	},
	{
		id: "ps_Achievement_AllFavorsDone",
		name: "Fulfilled",
		subtitle: "Leave no Favor undone",
	},
	{
		id: "ps_Achievement_CollectInspirationFirst",
		name: "Inspired",
		subtitle: "Find your first inspiration",
	},
	{
		id: "ps_Achievement_CollectAllInspirations",
		name: "Illuminated",
		subtitle: "Find all inspirations",
	},
	{
		id: "ps_Achievement_UpgradeAllInspirations",
		location: "J04",
		name: "Awakened",
		subtitle: "Upgrade all inspirations",
	},
	{
		id: "ps_Achievement_VisitEveryRoom",
		name: "Explorer",
		subtitle: "Visit every room in the game",
	},
	{
		id: "ps_Achievement_PlaceInspirations1",
		name: "Aspiring Artist",
		subtitle: "Fill out the inspiration page with sketches",
	},
	{
		id: "ps_Achievement_PlaceInspirations2",
		name: "Master Artist",
		subtitle: "Fill out the inspiration page with colored drawings",
	},
	{
		id: "ps_Achievement_AllMilkshakes",
		name: "Milkshake Mayhem",
		subtitle: "Finish all Milkshake Challenges",
	},
	{
		id: "ps_Achievement_FullCompletion",
		name: "Virtuoso",
		subtitle: "Achieve 100% game completion",
	},
	{
		id: "ps_Achievement_FullCompletionSpeedrun",
		name: "True Virtuoso",
		subtitle: "Achieve 100% game completion in under 8 hours",
	},
	{
		id: "ps_Achievement_AllAchievements",
		name: "Inner Canvas",
		subtitle: "Acquire all other achievements",
	},
	{
		id: "ps_Achievement_BertramNoodleStand",
		location: "J04",
		name: "Stand-Up",
		subtitle: "Listen to all of Bertram's jokes",
	},
	{
		id: "ps_Achievement_VincentNoodleStand",
		location: "J04",
		name: "Respite",
		subtitle: "Converse with Vincent at the Noodle Bar",
	},
	{
		id: "ps_Achievement_FindCommunityRoom",
		location: "F20",
		name: "Leave Your Mark",
		subtitle: "Find the Community Room",
	},
];

type BuildAchievementGroupsParams = BuildGroupsBaseParams;

function buildAchievementsGroup(params: BuildAchievementGroupsParams) {
	return buildBaseGroup({
		buildGroupBaseParams: params,
		defaultKind: "boolean",
		definitions: achievementEntries,
		title: "Achievements",
	});
}

export { buildAchievementsGroup };
