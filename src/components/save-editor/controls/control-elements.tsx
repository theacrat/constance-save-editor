import { Checkbox } from "@react-spectrum/s2/Checkbox";
import { NumberField } from "@react-spectrum/s2/NumberField";
import { Picker, PickerItem } from "@react-spectrum/s2/Picker";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { TextField } from "@react-spectrum/s2/TextField";
import { useCallback } from "react";
import type { Key, ReactElement, ReactNode } from "react";

interface ControlBaseProps<T> {
	ariaLabel: string;
	id: string;
	label?: string;
	onChange: (value: T) => void;
	value: T;
}

const integerFormatOptions = {
	maximumFractionDigits: 0,
	useGrouping: false,
};

const checkboxWrapperStyles = style({
	justifySelf: {
		default: "start",
		md: "end",
	},
});

const controlGroupStyles = style({
	alignItems: "start",
	display: "flex",
	flexDirection: "column",
	gap: 8,
	width: "full",
});

const subcontrolStyles = style({
	alignItems: {
		isCompact: "center",
	},
	display: "flex",
	flexBasis: {
		isCompact: "auto",
	},
	flexDirection: "column",
	flexGrow: {
		default: 1,
		isCompact: 0,
	},
	flexShrink: {
		isCompact: 0,
	},
	gap: 2,
});

type CheckboxControlProps = ControlBaseProps<boolean>;

function CheckboxControl({
	ariaLabel,
	id,
	label,
	onChange,
	value,
}: CheckboxControlProps): ReactNode {
	return (
		<span className={checkboxWrapperStyles}>
			<Checkbox
				aria-label={ariaLabel}
				id={id}
				isEmphasized
				isSelected={value}
				onChange={onChange}
			>
				{label}
			</Checkbox>
		</span>
	);
}

interface ControlGroupProps {
	children: ReactNode;
}

function ControlGroup({ children }: ControlGroupProps): ReactNode {
	return <div className={controlGroupStyles}>{children}</div>;
}

type NumberControlProps = ControlBaseProps<number>;

function NumberControl({
	ariaLabel,
	id,
	label,
	onChange,
	value,
}: NumberControlProps): ReactNode {
	return (
		<NumberField
			aria-label={ariaLabel}
			formatOptions={integerFormatOptions}
			id={id}
			value={value}
			label={label}
			minValue={0}
			onChange={onChange}
			styles={style({
				width: "full",
			})}
		/>
	);
}

interface SelectControlProps extends ControlBaseProps<string> {
	options: { label: string; value: string }[];
}

function SelectControl({
	ariaLabel,
	id,
	label,
	onChange,
	options,
	value,
}: SelectControlProps): ReactNode {
	const handleSelectionChange = useCallback(
		(key: Key | null) => {
			if (key !== null) {
				onChange(String(key));
			}
		},
		[onChange],
	);

	return (
		<Picker
			aria-label={ariaLabel}
			id={id}
			label={label}
			value={value}
			onChange={handleSelectionChange}
			styles={style({
				width: "full",
			})}
		>
			{options.map((option) => (
				<PickerItem id={option.value} key={option.value}>
					{option.label}
				</PickerItem>
			))}
		</Picker>
	);
}

interface SubcontrolProps {
	children: ReactNode;
	isCompact?: boolean;
}

function Subcontrol({
	children,
	isCompact = false,
}: SubcontrolProps): ReactElement {
	return <span className={subcontrolStyles({ isCompact })}>{children}</span>;
}

type TextControlProps = ControlBaseProps<string>;

function TextControl({
	ariaLabel,
	id,
	label,
	onChange,
	value,
}: TextControlProps): ReactNode {
	return (
		<TextField
			aria-label={ariaLabel}
			id={id}
			label={label}
			value={value}
			onChange={onChange}
			styles={style({
				width: "full",
			})}
		/>
	);
}

export {
	CheckboxControl,
	ControlGroup,
	NumberControl,
	SelectControl,
	Subcontrol,
	TextControl,
};
