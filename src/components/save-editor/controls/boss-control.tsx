import { useCallback } from "react";

import {
	CheckboxControl,
	ControlGroup,
	NumberControl,
	Subcontrol,
} from "@/components/save-editor/controls/control-elements";
import type { JsonUpdate } from "@/utils/save-editor/json";
import {
	parseBooleanValue,
	parseNumberValue,
	setWorldEntryValue,
} from "@/utils/save-editor/world-entries";
import type { WorldEntry } from "@/utils/save-editor/world-entries";

import type { ControlBaseProps } from "./base-controls";

interface BossDefinition {
	bossId: string;
	name: string;
}

type BossAttemptsControlProps = ControlBaseProps<BossDefinition>;

function BossAttemptsControl({
	def,
	entry,
	onUpdateJson,
}: BossAttemptsControlProps) {
	const attemptsId = `ps_Boss_${def.bossId}_Attempts`;

	const handleAttemptsChange = useCallback(
		(value: number) => {
			onUpdateJson((draft) => {
				setWorldEntryValue({
					id: attemptsId,
					jsonDocument: draft,
					value: `I${value}`,
				});
			});
		},
		[attemptsId, onUpdateJson],
	);

	return (
		<Subcontrol>
			<NumberControl
				ariaLabel={`${def.name} attempts`}
				id={attemptsId}
				label="Attempts"
				onChange={handleAttemptsChange}
				value={parseNumberValue(entry?.value)}
			/>
		</Subcontrol>
	);
}

type BossBeatenControlProps = ControlBaseProps<BossDefinition>;

function BossBeatenControl({
	def,
	entry,
	onUpdateJson,
}: BossBeatenControlProps) {
	const beatenId = `ps_Boss_${def.bossId}_Beaten`;

	const handleBeatenChange = useCallback(
		(value: boolean) => {
			onUpdateJson((draft) => {
				setWorldEntryValue({
					id: beatenId,
					jsonDocument: draft,
					value: `B${value ? 1 : 0}`,
				});
			});
		},
		[beatenId, onUpdateJson],
	);

	return (
		<Subcontrol isCompact>
			<CheckboxControl
				ariaLabel={`${def.name} beaten`}
				id={beatenId}
				label="Beaten"
				onChange={handleBeatenChange}
				value={parseBooleanValue(entry?.value)}
			/>
		</Subcontrol>
	);
}

interface BossControlProps {
	attemptsEntry: WorldEntry | undefined;
	beatenEntry: WorldEntry | undefined;
	def: BossDefinition;
	onUpdateJson: JsonUpdate;
}

function BossControl({
	attemptsEntry,
	beatenEntry,
	def,
	onUpdateJson,
}: BossControlProps) {
	return (
		<ControlGroup>
			<BossBeatenControl
				entry={beatenEntry}
				def={def}
				onUpdateJson={onUpdateJson}
			/>
			<BossAttemptsControl
				entry={attemptsEntry}
				def={def}
				onUpdateJson={onUpdateJson}
			/>
		</ControlGroup>
	);
}

export { BossControl };
