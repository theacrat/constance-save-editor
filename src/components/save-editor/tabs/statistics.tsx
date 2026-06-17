import { buildBaseGroup } from "@/components/save-editor/controls/entry-controls";
import { PlayerStatControl } from "@/components/save-editor/controls/player-stat-control";
import type { FieldGroup, FieldItem } from "@/types/save-editor";
import type { FieldDefinition } from "@/types/save-editor/tabs";
import { isJsonObject } from "@/utils/save-editor/json";
import type { JsonObject, JsonUpdate } from "@/utils/save-editor/json";

import type { BuildGroupsBaseParams } from "./build-primary-groups";

const statisticEntries: FieldDefinition[] = [
	{
		id: "ps_StatId_GameOverByCorruption",
		name: "Game Overs by Corruption",
	},
	{
		id: "ps_StatId_SnapshotsTaken",
		name: "Snapshots Taken",
	},
	{
		id: "ps_StatId_PoppedUnstableBubbles",
		name: "Popped Unstable Bubbles",
	},
	{
		id: "ps_StatId_PetTheCat",
		name: "Pet the Cat",
	},
	{
		id: "ps_StatId_Persevered",
		name: "Persevered",
	},
	{
		id: "ps_StatId_DroppedMilkshakes",
		name: "Dropped Milkshakes",
	},
	{
		id: "ps_StatId_CloneCount",
		name: "Clone Count",
	},
	{
		id: "ps_StatId_AllTimeCollectedLightStones",
		name: "All-Time Collected Light Stones",
	},
	{
		id: "ps_StatId_BackToShrine",
		name: "Back to Shrine",
	},
	{
		id: "ps_StatId_Electrocuted",
		name: "Electrocuted",
	},
	{
		id: "ps_StatId_SplooshCount",
		name: "Sploosh Count",
	},
	{
		id: "ps_StatId_ReceivedDamage",
		name: "Received Damage",
	},
	{
		id: "ps_StatId_EnemiesKilled",
		name: "Enemies Killed",
	},
	{
		id: "ps_StatId_BrushHits",
		name: "Brush Hits",
	},
	{
		id: "ps_StatId_AllTimeCollectedGlimmer",
		mirrorIds: ["ps_TotalCollectCount_Currency"],
		name: "All-Time Collected Glimmer",
	},
	{
		id: "ps_StatId_DashCount",
		name: "Dash Count",
	},
	{
		id: "ps_GachaMachineSpent",
		name: "Gacha Machine Spent",
	},
];

const playerStatEntries = [
	{ key: "PlayedTime", name: "Played Time (ms)" },
	{ key: "AfkTime", name: "AFK Time (ms)" },
];

interface BuildPlayerStatItemsParams {
	jsonDocument: JsonObject;
	onUpdateJson: JsonUpdate;
}

function buildPlayerStatItems({
	jsonDocument,
	onUpdateJson,
}: BuildPlayerStatItemsParams): FieldItem[] {
	const player = isJsonObject(jsonDocument["Player"])
		? jsonDocument["Player"]
		: undefined;

	if (!player) {
		return [];
	}

	return playerStatEntries.flatMap((def) => {
		const value = player[def.key];
		if (typeof value !== "number") {
			return [];
		}

		return [
			{
				control: (
					<PlayerStatControl
						id={`player-${def.key}`}
						label={def.name}
						onUpdateJson={onUpdateJson}
						playerKey={def.key}
						value={value}
					/>
				),
				def,
				key: `player-${def.key}`,
			},
		];
	});
}

type BuildStatisticsGroupParams = BuildGroupsBaseParams;

function buildStatisticsGroup(params: BuildStatisticsGroupParams): FieldGroup {
	const group = buildBaseGroup({
		buildGroupBaseParams: params,
		defaultKind: "number",
		definitions: statisticEntries,
		title: "Statistics",
	});

	return {
		...group,
		items: [...buildPlayerStatItems(params), ...group.items],
	};
}

export { buildStatisticsGroup };
