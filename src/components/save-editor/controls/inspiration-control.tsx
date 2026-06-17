import { useCallback, useMemo } from "react";

import { SelectControl } from "@/components/save-editor/controls/control-elements";
import type { JsonObject, JsonUpdate } from "@/utils/save-editor/json";
import {
	parseBooleanValue,
	parseNumberValue,
	removeWorldEntry,
	setWorldEntryValue,
} from "@/utils/save-editor/world-entries";
import type { WorldEntry } from "@/utils/save-editor/world-entries";

interface InspirationDefinition {
	inspirationId: string;
	name: string;
}

interface BuildInspirationOptionsParams {
	hasUpgradeField: boolean;
}

function buildInspirationOptions({
	hasUpgradeField,
}: BuildInspirationOptionsParams) {
	return [
		{ label: "Not obtained", value: "not-obtained" },
		{ label: "Obtained", value: "obtained" },
		...(hasUpgradeField ? [{ label: "Upgraded", value: "upgraded" }] : []),
	];
}

interface GetInspirationStateParams {
	baseValue: string | undefined;
	upgradedValue: string | undefined;
}

function getInspirationState({
	baseValue,
	upgradedValue,
}: GetInspirationStateParams) {
	if (parseBooleanValue(upgradedValue)) {
		return "upgraded";
	}

	if (parseNumberValue(baseValue) > 0) {
		return "obtained";
	}

	return "not-obtained";
}

interface UpdateInspirationStateParams {
	baseId: string;
	draft: JsonObject;
	hasUpgradeField: boolean;
	nextValue: string;
	placedId: string;
	upgradedId: string;
}

function updateInspirationState({
	baseId,
	draft,
	hasUpgradeField,
	nextValue,
	placedId,
	upgradedId,
}: UpdateInspirationStateParams) {
	if (nextValue === "not-obtained") {
		removeWorldEntry({ id: baseId, jsonDocument: draft });
		removeWorldEntry({ id: upgradedId, jsonDocument: draft });
		removeWorldEntry({ id: placedId, jsonDocument: draft });

		return;
	}

	setWorldEntryValue({
		id: baseId,
		jsonDocument: draft,
		value: "I1",
	});

	if (hasUpgradeField) {
		setWorldEntryValue({
			id: upgradedId,
			jsonDocument: draft,
			value: nextValue === "upgraded" ? "B1" : "B0",
		});
	}
}

interface InspirationControlProps {
	baseEntry: WorldEntry | undefined;
	def: InspirationDefinition;
	hasUpgradeField: boolean;
	onUpdateJson: JsonUpdate;
	upgradedEntry: WorldEntry | undefined;
}

function InspirationControl({
	baseEntry,
	def,
	hasUpgradeField,
	onUpdateJson,
	upgradedEntry,
}: InspirationControlProps) {
	const baseId = `ps_inspDrawing_${def.inspirationId}`;
	const placedId = `ps_InspirationPlaced_${def.inspirationId}`;
	const upgradedId = `${baseId}_Upgraded`;

	const options = useMemo(
		() => buildInspirationOptions({ hasUpgradeField }),
		[hasUpgradeField],
	);

	const handleChange = useCallback(
		(nextValue: string) => {
			onUpdateJson((draft) => {
				updateInspirationState({
					baseId,
					draft,
					hasUpgradeField,
					nextValue,
					placedId,
					upgradedId,
				});
			});
		},
		[baseId, hasUpgradeField, onUpdateJson, placedId, upgradedId],
	);

	const state = getInspirationState({
		baseValue: baseEntry?.value,
		upgradedValue: upgradedEntry?.value,
	});

	return (
		<SelectControl
			ariaLabel={def.name}
			id={`insp-${def.inspirationId}`}
			onChange={handleChange}
			options={options}
			value={state}
		/>
	);
}

export { InspirationControl };
