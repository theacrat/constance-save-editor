import type { FieldGroup } from "@/types/save-editor";
import type { JsonObject, JsonUpdate } from "@/utils/save-editor/json";
import { getWorldEntries } from "@/utils/save-editor/world-entries";

import { buildPrimaryGroups } from "./build-primary-groups";

interface BuildFieldGroupsParams {
	jsonDocument: JsonObject;
	onUpdateJson: JsonUpdate;
}

function buildFieldGroups({
	jsonDocument,
	onUpdateJson,
}: BuildFieldGroupsParams): FieldGroup[] {
	const entries = getWorldEntries(jsonDocument);
	const entryMap = new Map((entries ?? []).map((entry) => [entry.id, entry]));

	const groups: FieldGroup[] = [
		...buildPrimaryGroups({ entryMap, jsonDocument, onUpdateJson }),
	];

	return groups.filter((group) => group.items.length > 0);
}

export { buildFieldGroups };
