import type { FieldGroup } from "@/types/save-editor";
// oxlint-disable import/max-dependencies
import type { EntryMap } from "@/types/save-editor/tabs";
import type { JsonObject, JsonUpdate } from "@/utils/save-editor/json";

import { buildAchievementsGroup } from "./achievements";
import { buildBossesGroup } from "./bosses";
import { buildBrushTechniquesGroup } from "./brush-techniques";
import { buildCurrenciesGroup } from "./currencies";
import { buildErasersGroup } from "./erasers";
import { buildFavorTargetsGroup } from "./favor-targets";
import { buildHeartPiecesGroup } from "./heart-pieces";
import { buildInspirationsGroup } from "./inspirations";
import { buildKeyItemsGroup } from "./key-items";
import { buildMilkshakesGroup } from "./milkshakes";
import { buildPaintFlasksGroup } from "./paint-flasks";
import { buildQuestsGroup } from "./quests";
import { buildSnapshotsGroup } from "./snapshots";
import { buildStatisticsGroup } from "./statistics";
import { buildTearsGroup } from "./tears";

interface BuildGroupsBaseParams {
	jsonDocument: JsonObject;
	entryMap: EntryMap;
	onUpdateJson: JsonUpdate;
}

type BuildPrimaryGroupsParams = BuildGroupsBaseParams;

function buildPrimaryGroups(params: BuildPrimaryGroupsParams): FieldGroup[] {
	return [
		buildCurrenciesGroup(params),
		buildInspirationsGroup(params),
		buildBrushTechniquesGroup(params),
		buildKeyItemsGroup(params),
		buildTearsGroup(params),
		buildQuestsGroup(params),
		buildFavorTargetsGroup(params),
		buildMilkshakesGroup(params),
		buildHeartPiecesGroup(params),
		buildPaintFlasksGroup(params),
		buildErasersGroup(params),
		buildSnapshotsGroup(params),
		buildBossesGroup(params),
		buildStatisticsGroup(params),
		buildAchievementsGroup(params),
	];
}

export { buildPrimaryGroups };
export type { BuildGroupsBaseParams };
