import { useCallback } from "react";

import {
	CheckboxControl,
	ControlGroup,
	Subcontrol,
} from "@/components/save-editor/controls/control-elements";
import type { JsonUpdate } from "@/utils/save-editor/json";
import {
	parseBooleanLikeValue,
	parseBooleanValue,
	parseValueType,
	setWorldEntryValue,
} from "@/utils/save-editor/world-entries";
import type { WorldEntry } from "@/utils/save-editor/world-entries";

import type { ControlBaseProps } from "./base-controls";

function booleanLikeWritePrefix(entry: WorldEntry | undefined): "B" | "I" {
	if (entry && parseValueType(entry.value) === "I") {
		return "I";
	}

	return entry ? "B" : "I";
}

interface TearDefinition {
	name: string;
	tearId: string;
}

type TearRevealedControlProps = ControlBaseProps<TearDefinition>;

function TearRevealedControl({
	def,
	onUpdateJson,
	entry,
}: TearRevealedControlProps) {
	const revealedId = `ps_unlock_Tear_${def.tearId}_MapIconRevealed`;

	const handleRevealedChange = useCallback(
		(checked: boolean) => {
			onUpdateJson((draft) => {
				setWorldEntryValue({
					id: revealedId,
					jsonDocument: draft,
					value: `B${checked ? 1 : 0}`,
				});
			});
		},
		[onUpdateJson, revealedId],
	);

	return (
		<Subcontrol isCompact>
			<CheckboxControl
				ariaLabel={`${def.name} map icon revealed`}
				id={revealedId}
				label="Map icon"
				onChange={handleRevealedChange}
				value={parseBooleanValue(entry?.value)}
			/>
		</Subcontrol>
	);
}

type TearUnlockedControlProps = ControlBaseProps<TearDefinition>;

function TearUnlockedControl({
	def,
	onUpdateJson,
	entry,
}: TearUnlockedControlProps) {
	const unlockedId = `ps_unlock_Tear_${def.tearId}`;

	const handleUnlockedChange = useCallback(
		(checked: boolean) => {
			const prefix = booleanLikeWritePrefix(entry);
			onUpdateJson((draft) => {
				setWorldEntryValue({
					id: unlockedId,
					jsonDocument: draft,
					value: `${prefix}${checked ? 1 : 0}`,
				});
			});
		},
		[onUpdateJson, entry, unlockedId],
	);

	return (
		<Subcontrol isCompact>
			<CheckboxControl
				ariaLabel={`${def.name} unlocked`}
				id={unlockedId}
				label="Unlocked"
				onChange={handleUnlockedChange}
				value={parseBooleanLikeValue(entry?.value ?? "")}
			/>
		</Subcontrol>
	);
}

interface TearControlProps {
	def: TearDefinition;
	onUpdateJson: JsonUpdate;
	revealedEntry: WorldEntry | undefined;
	unlockedEntry: WorldEntry | undefined;
}

function TearControl({
	def,
	onUpdateJson,
	revealedEntry,
	unlockedEntry,
}: TearControlProps) {
	return (
		<ControlGroup>
			<TearUnlockedControl
				def={def}
				onUpdateJson={onUpdateJson}
				entry={unlockedEntry}
			/>
			<TearRevealedControl
				def={def}
				onUpdateJson={onUpdateJson}
				entry={revealedEntry}
			/>
		</ControlGroup>
	);
}

export { TearControl };
