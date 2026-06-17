import { Divider } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { Tab, TabList, TabPanel, Tabs } from "@react-spectrum/s2/Tabs";
import { useCallback, useMemo, useState } from "react";
import type { Key } from "react";

import type { FieldGroup, FieldItem } from "@/types/save-editor";
import { isJsonObject } from "@/utils/save-editor/json";
import type { JsonObject } from "@/utils/save-editor/json";

import { buildFieldGroups } from "./tabs";

const fieldGroupStyles = style({
	paddingStart: 16,
});

const fieldLabelStyles = style({
	flexGrow: 1,
	overflow: "hidden",
});

const fieldLocationStyles = style({
	font: "detail",
});

const fieldRowStyles = style({
	alignItems: "start",
	display: "flex",
	flexGrow: 1,
	gap: 32,
});

const fieldRowsStyles = style({
	display: "grid",
	flexDirection: "column",
	flexGrow: 1,
	gap: 16,
});

const fieldSubtitleStyles = style({
	font: "detail",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});

const labelStyles = style({
	font: "title",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});

interface FieldLocationProps {
	location?: string | undefined;
}

function FieldLocation({ location }: FieldLocationProps) {
	return location ? (
		<span className={fieldLocationStyles}>
			{" — "}
			{location}
		</span>
	) : undefined;
}

interface FieldLabelProps {
	item: FieldItem;
}

function FieldLabel({ item }: FieldLabelProps) {
	return (
		<div className={fieldLabelStyles}>
			<label className={labelStyles} htmlFor={item.key}>
				{item.def.name}
				<FieldLocation location={item.def.location} />
			</label>
			<br />
			<span className={fieldSubtitleStyles}>{item.def.subtitle}</span>
		</div>
	);
}

interface FieldRowProps {
	hasDivider: boolean;
	item: FieldItem;
}

function FieldRow({ hasDivider, item }: FieldRowProps) {
	return (
		<div
			className={style({
				display: "flex",
				flexDirection: "column",
				gap: 16,
			})}
		>
			<div className={fieldRowStyles}>
				<FieldLabel item={item} />
				<div className={style({ flexGrow: 0, flexShrink: 0 })}>
					{item.control}
				</div>
			</div>
			{hasDivider && <Divider />}
		</div>
	);
}

interface FieldRowsProps {
	items: FieldItem[];
}

function FieldRows({ items }: FieldRowsProps) {
	return (
		<div className={fieldRowsStyles}>
			{items.map((item, index) => (
				<FieldRow
					item={item}
					key={item.key}
					hasDivider={index !== items.length - 1}
				/>
			))}
		</div>
	);
}

interface FieldGroupPanelProps {
	group: FieldGroup;
}

function FieldGroupPanel({ group }: FieldGroupPanelProps) {
	return (
		<section className={fieldGroupStyles}>
			<FieldRows items={group.items} />
		</section>
	);
}

interface FieldGroupPanelsProps {
	groups: FieldGroup[];
}

function FieldGroupPanels({ groups }: FieldGroupPanelsProps) {
	return (
		<>
			{groups.map((group) => (
				<TabPanel
					id={group.title}
					key={group.title}
					styles={style({ marginTop: 0 })}
				>
					<FieldGroupPanel group={group} />
				</TabPanel>
			))}
		</>
	);
}

interface FieldGroupTabsProps {
	groups: FieldGroup[];
	onSelectionChange: (key: Key) => void;
	selectedGroup: FieldGroup;
}

function FieldGroupTabs({
	groups,
	onSelectionChange,
	selectedGroup,
}: FieldGroupTabsProps) {
	return (
		<Tabs
			aria-label="Save field groups"
			orientation="vertical"
			selectedKey={selectedGroup.title}
			onSelectionChange={onSelectionChange}
		>
			<TabList>
				{groups.map((group) => (
					<Tab id={group.title} key={group.title}>
						{group.title}
					</Tab>
				))}
			</TabList>
			<FieldGroupPanels groups={groups} />
		</Tabs>
	);
}

interface FieldEditorPanelProps {
	jsonDocument: unknown;
	onUpdateJson: (update: (draft: JsonObject) => void) => void;
}

function FieldEditorPanel({
	jsonDocument,
	onUpdateJson,
}: FieldEditorPanelProps) {
	const [selectedGroupTitle, setSelectedGroupTitle] = useState("Player");
	const groups = useMemo(
		() =>
			isJsonObject(jsonDocument)
				? buildFieldGroups({ jsonDocument, onUpdateJson })
				: [],
		[jsonDocument, onUpdateJson],
	);
	const selectedGroup =
		groups.find((group) => group.title === selectedGroupTitle) ?? groups[0];
	const handleSelectionChange = useCallback((key: Key) => {
		setSelectedGroupTitle(String(key));
	}, []);

	return (
		<div
			className={style({
				backgroundColor: "layer-1",
				borderColor: "transparent-black-75",
				borderRadius: "sm",
				borderStyle: "solid",
				borderWidth: 1,
				minWidth: 160,
				padding: 16,
			})}
		>
			{selectedGroup ? (
				<FieldGroupTabs
					groups={groups}
					onSelectionChange={handleSelectionChange}
					selectedGroup={selectedGroup}
				/>
			) : (
				<span>No save file selected.</span>
			)}
		</div>
	);
}

export { FieldEditorPanel };
