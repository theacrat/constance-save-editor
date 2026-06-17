import { useCallback } from "react";
import type { ComponentType } from "react";

import {
	CheckboxControl,
	NumberControl,
	SelectControl,
	TextControl,
} from "@/components/save-editor/controls/control-elements";
import type { ControlBaseProps } from "@/types/save-editor/controls";
import type { FieldKind, FieldDefinition } from "@/types/save-editor/tabs";
import type { JsonObject } from "@/utils/save-editor/json";
import {
	getWorldEntryValue,
	isCollectibleFlagSet,
	parseBooleanLikeValue,
	parseBooleanValue,
	parseNumberValue,
	parseValueType,
	removeWorldEntry,
	setWorldEntryValue,
} from "@/utils/save-editor/world-entries";
import type { WorldEntry } from "@/utils/save-editor/world-entries";

const emptyOptions: { label: string; value: string }[] = [];

interface ApplyDeltaParams {
	checked: boolean;
	delta: FieldDefinition["delta"];
	draft: JsonObject;
}

function applyDelta({ checked, delta, draft }: ApplyDeltaParams) {
	if (!delta) {
		return;
	}

	const current = parseNumberValue(
		getWorldEntryValue({ id: delta.targetId, jsonDocument: draft }),
	);

	setWorldEntryValue({
		id: delta.targetId,
		jsonDocument: draft,
		value: `I${current + (checked ? delta.amount : -delta.amount)}`,
	});
}

function booleanLikeWritePrefix(entry: WorldEntry | undefined): "B" | "I" {
	if (entry && parseValueType(entry.value) === "I") {
		return "I";
	}

	return entry ? "B" : "I";
}

type BaseBooleanControlProps = ControlBaseProps<FieldDefinition>;

function BaseBooleanControl({
	def,
	entry,
	onUpdateJson,
}: BaseBooleanControlProps) {
	const handleChange = useCallback(
		(value: boolean) => {
			onUpdateJson((draft) => {
				setWorldEntryValue({
					id: def.id,
					jsonDocument: draft,
					value: `B${value ? 1 : 0}`,
				});

				applyDelta({ checked: value, delta: def.delta, draft });
			});
		},
		[def.delta, def.id, onUpdateJson],
	);

	return (
		<CheckboxControl
			ariaLabel={def.name}
			id={def.id}
			onChange={handleChange}
			value={parseBooleanValue(entry?.value)}
		/>
	);
}

type BaseBooleanLikeControlProps = ControlBaseProps<FieldDefinition>;

function BaseBooleanLikeControl({
	def,
	entry,
	onUpdateJson,
}: BaseBooleanLikeControlProps) {
	const handleChange = useCallback(
		(value: boolean) => {
			const stringValue = `${booleanLikeWritePrefix(entry)}${value ? 1 : 0}`;

			onUpdateJson((draft) => {
				setWorldEntryValue({
					id: def.id,
					jsonDocument: draft,
					value: stringValue,
				});

				for (const mirrorId of def.mirrorIds ?? []) {
					setWorldEntryValue({
						id: mirrorId,
						jsonDocument: draft,
						value: stringValue,
					});
				}

				applyDelta({ checked: value, delta: def.delta, draft });
			});
		},
		[def.delta, def.id, def.mirrorIds, entry, onUpdateJson],
	);

	return (
		<CheckboxControl
			ariaLabel={def.name}
			id={def.id}
			onChange={handleChange}
			value={parseBooleanLikeValue(entry?.value ?? "")}
		/>
	);
}

type BaseNumberControlProps = ControlBaseProps<FieldDefinition>;

function BaseNumberControl({
	def,
	entry,
	onUpdateJson,
}: BaseNumberControlProps) {
	const handleChange = useCallback(
		(value: number) => {
			onUpdateJson((draft) => {
				setWorldEntryValue({
					id: def.id,
					jsonDocument: draft,
					value: `I${value}`,
				});

				for (const mirrorId of def.mirrorIds ?? []) {
					setWorldEntryValue({
						id: mirrorId,
						jsonDocument: draft,
						value: `I${value}`,
					});
				}
			});
		},
		[def.id, def.mirrorIds, onUpdateJson],
	);

	return (
		<NumberControl
			ariaLabel={def.name}
			id={def.id}
			onChange={handleChange}
			value={parseNumberValue(entry?.value)}
		/>
	);
}

type BaseSelectControlProps = ControlBaseProps<FieldDefinition>;

function BaseSelectControl({
	def,
	entry,
	onUpdateJson,
}: BaseSelectControlProps) {
	const options = def.options ?? emptyOptions;
	const absentValue = options[0]?.value;
	const handleChange = useCallback(
		(value: string) => {
			onUpdateJson((draft) => {
				if (value === absentValue) {
					removeWorldEntry({ id: def.id, jsonDocument: draft });

					return;
				}

				setWorldEntryValue({
					id: def.id,
					jsonDocument: draft,
					value: `I${value}`,
				});
			});
		},
		[absentValue, def.id, onUpdateJson],
	);

	return (
		<SelectControl
			ariaLabel={def.name}
			id={def.id}
			onChange={handleChange}
			options={options}
			value={String(parseNumberValue(entry?.value))}
		/>
	);
}

type BaseTextControlProps = ControlBaseProps<FieldDefinition>;

function BaseTextControl({ def, entry, onUpdateJson }: BaseTextControlProps) {
	const handleChange = useCallback(
		(value: string) => {
			onUpdateJson((draft) => {
				setWorldEntryValue({
					id: def.id,
					jsonDocument: draft,
					value: `S${value}`,
				});
			});
		},
		[def.id, onUpdateJson],
	);

	return (
		<TextControl
			ariaLabel={def.name}
			id={def.id}
			onChange={handleChange}
			value={entry?.value ? entry.value.slice(1) : ""}
		/>
	);
}

type BaseThresholdControlProps = ControlBaseProps<FieldDefinition>;

function BaseThresholdControl({
	def,
	entry,
	onUpdateJson,
}: BaseThresholdControlProps) {
	const threshold = def.threshold ?? 1;

	const handleChange = useCallback(
		(value: boolean) => {
			onUpdateJson((draft) => {
				setWorldEntryValue({
					id: def.id,
					jsonDocument: draft,
					value: `I${value ? threshold : 0}`,
				});
			});
		},
		[def.id, onUpdateJson, threshold],
	);

	return (
		<CheckboxControl
			ariaLabel={def.name}
			id={def.id}
			onChange={handleChange}
			value={isCollectibleFlagSet({
				threshold,
				value: entry?.value,
			})}
		/>
	);
}

const BaseControlComponents = {
	boolean: BaseBooleanControl,
	"boolean-like": BaseBooleanLikeControl,
	number: BaseNumberControl,
	select: BaseSelectControl,
	text: BaseTextControl,
	threshold: BaseThresholdControl,
} satisfies Record<FieldKind, ComponentType<ControlBaseProps<FieldDefinition>>>;

interface BaseFieldControlProps extends ControlBaseProps<FieldDefinition> {
	defaultKind: FieldKind;
}

function BaseFieldControl({
	defaultKind,
	def,
	entry,
	onUpdateJson,
}: BaseFieldControlProps) {
	const BaseControl = BaseControlComponents[def.kind ?? defaultKind];

	return <BaseControl def={def} entry={entry} onUpdateJson={onUpdateJson} />;
}

export { BaseFieldControl };
export type { ControlBaseProps };
