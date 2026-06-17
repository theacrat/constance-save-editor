import { useCallback } from "react";

import {
	ControlGroup,
	SelectControl,
	Subcontrol,
	TextControl,
} from "@/components/save-editor/controls/control-elements";
import type { JsonUpdate } from "@/utils/save-editor/json";
import {
	parseNumberValue,
	removeWorldEntry,
	setWorldEntryValue,
} from "@/utils/save-editor/world-entries";
import type { WorldEntry } from "@/utils/save-editor/world-entries";

import type { ControlBaseProps } from "./base-controls";

const questStatusOptions = [
	{ label: "Undiscovered", value: "0" },
	{ label: "Started", value: "1" },
	{ label: "Complete", value: "2" },
];

interface QuestDefinition {
	name: string;
	questId: string;
}

type QuestIntelControlProps = ControlBaseProps<QuestDefinition>;

function QuestIntelControl({
	def,
	entry,
	onUpdateJson,
}: QuestIntelControlProps) {
	const intelId = `ps_quest_${def.questId}_intel`;

	const handleChange = useCallback(
		(value: string) => {
			onUpdateJson((draft) => {
				setWorldEntryValue({
					id: intelId,
					jsonDocument: draft,
					value: `S${value}`,
				});
			});
		},
		[intelId, onUpdateJson],
	);

	return (
		<Subcontrol>
			<TextControl
				ariaLabel={`${def.name} intel`}
				id={intelId}
				label="Intel"
				onChange={handleChange}
				value={entry?.value ? entry.value.slice(1) : ""}
			/>
		</Subcontrol>
	);
}

type QuestStatusControlProps = ControlBaseProps<QuestDefinition>;

function QuestStatusControl({
	def,
	onUpdateJson,
	entry,
}: QuestStatusControlProps) {
	const statusId = `ps_quest_${def.questId}_status`;

	const handleChange = useCallback(
		(value: string) => {
			onUpdateJson((draft) => {
				if (value === "0") {
					removeWorldEntry({ id: statusId, jsonDocument: draft });
					return;
				}

				setWorldEntryValue({
					id: statusId,
					jsonDocument: draft,
					value: `I${value}`,
				});
			});
		},
		[onUpdateJson, statusId],
	);

	return (
		<Subcontrol>
			<SelectControl
				ariaLabel={`${def.name} status`}
				id={statusId}
				label="Status"
				onChange={handleChange}
				options={questStatusOptions}
				value={String(parseNumberValue(entry?.value))}
			/>
		</Subcontrol>
	);
}

interface QuestControlProps {
	def: QuestDefinition;
	intelEntry: WorldEntry | undefined;
	onUpdateJson: JsonUpdate;
	statusEntry: WorldEntry | undefined;
}

function QuestControl({
	def,
	intelEntry,
	onUpdateJson,
	statusEntry,
}: QuestControlProps) {
	return (
		<ControlGroup>
			<QuestStatusControl
				def={def}
				onUpdateJson={onUpdateJson}
				entry={statusEntry}
			/>
			<QuestIntelControl
				def={def}
				entry={intelEntry}
				onUpdateJson={onUpdateJson}
			/>
		</ControlGroup>
	);
}

export { QuestControl };
