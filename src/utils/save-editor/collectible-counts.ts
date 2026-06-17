import {
	eraserEntries,
	startingEraserCount,
} from "@/components/save-editor/tabs/erasers";
import { heartPieceEntries } from "@/components/save-editor/tabs/heart-pieces";
import { healthVialEntries } from "@/components/save-editor/tabs/key-items";
import { paintFlaskEntries } from "@/components/save-editor/tabs/paint-flasks";

import { isJsonObject } from "./json";
import type { JsonObject } from "./json";
import {
	countCollectedFlags,
	getWorldEntries,
	setWorldEntryValue,
} from "./world-entries";

function recalculateCollectibleCounts(jsonDocument: JsonObject) {
	if (!isJsonObject(jsonDocument["World"])) {
		return;
	}

	const entries = getWorldEntries(jsonDocument) ?? [];
	const entryMap = new Map(entries.map((entry) => [entry.id, entry]));

	setWorldEntryValue({
		id: "ps_item_HeartPiece",
		jsonDocument,
		value: `I${countCollectedFlags({ entryMap, flags: heartPieceEntries })}`,
	});
	setWorldEntryValue({
		id: "ps_item_PaintPiece",
		jsonDocument,
		value: `I${countCollectedFlags({ entryMap, flags: paintFlaskEntries })}`,
	});
	setWorldEntryValue({
		id: "ps_item_Eraser",
		jsonDocument,
		value: `I${startingEraserCount + countCollectedFlags({ entryMap, flags: eraserEntries })}`,
	});
	setWorldEntryValue({
		id: "ps_item_Potion",
		jsonDocument,
		value: `I${countCollectedFlags({ entryMap, flags: healthVialEntries })}`,
	});
}

export { recalculateCollectibleCounts };
