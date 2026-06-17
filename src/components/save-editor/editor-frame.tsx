import { Divider, Image } from "@react-spectrum/s2";
import { Heading } from "@react-spectrum/s2/Heading";
import { Link } from "@react-spectrum/s2/Link";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };

import type { SaveArchive } from "@/utils/con-codec";
import type { JsonUploadState } from "@/utils/save-editor/file-status";
import type { JsonObject } from "@/utils/save-editor/json";

import { FieldEditorPanel } from "./field-editor-panel";
import { WorkflowPanel } from "./workflow-panel";

function Header() {
	return (
		<div
			className={style({
				alignItems: "center",
				alignSelf: "center",
				display: "flex",
				flexDirection: "column",
			})}
		>
			<Image
				src="/images/logo.webp"
				width={628}
				height={202}
				styles={style({
					backgroundColor: "transparent",
					maxWidth: 300,
				})}
				alt="Constance"
			/>
			<Heading
				level={1}
				styles={style({
					colorScheme: "dark",
					font: "heading-xl",
					margin: 0,
				})}
			>
				Save Editor
			</Heading>
		</div>
	);
}

function InformationPanel() {
	return (
		<div
			className={style({
				backgroundColor: "layer-1",
				borderColor: "transparent-black-75",
				borderRadius: "sm",
				borderStyle: "solid",
				borderWidth: 1,
				padding: 16,
			})}
		>
			<p className={style({ marginTop: 0 })}>
				Get your save file from{" "}
				<code className={style({ font: "code" })}>
					%USERPROFILE%\AppData\LocalLow\bluebackpack\CONSTANCE\Saves\Prod
				</code>
			</p>
			<p>
				Locations are marked with the game&apos;s room ID (e.g.
				&quot;P01&quot;). Check the{" "}
				<Link href="/images/map.webp" target="_blank">
					room ID map
				</Link>{" "}
				for reference.
			</p>
			<p>
				This should cover the most useful fields, but if you want to tinker
				more, you can download the full JSON of a save file and tinker with it.
			</p>
			<p className={style({ marginBottom: 0 })}>
				Messing with things other than currency and statistics may cause issues.
				Make a backup!
			</p>
		</div>
	);
}

function EditorLinks() {
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
				textAlign: "center",
			})}
		>
			<span>
				<Link
					href="https://store.steampowered.com/app/2313700/Constance/"
					target="_blank"
				>
					Constance
				</Link>{" "}
				by{" "}
				<Link href="https://bluebackpackgames.com/" target="_blank">
					Blue Backpack
				</Link>{" "}
				© 2025–
			</span>
			<Divider styles={style({ marginY: 16 })} />
			<span>Constance Save Editor by thea</span>
			<br />
			<Link
				href="https://github.com/theacrat/constance-save-editor"
				target="_blank"
				isStandalone
			>
				GitHub
			</Link>
			<br />
			<Link href="https://ko-fi.com/theacrat" isStandalone target="_blank">
				support the developer
			</Link>
		</div>
	);
}

interface EditorPageProps {
	archive?: SaveArchive | undefined;
	jsonDocument: unknown;
	jsonUpload: JsonUploadState;
	onDownloadJson: () => void;
	onDownloadSave: () => void;
	onJsonFile: (file: File) => Promise<void>;
	onSaveFile: (file: File) => Promise<void>;
	onUpdateJson: (update: (draft: JsonObject) => void) => void;
	saveError?: string | undefined;
	saveFileName?: string | undefined;
}

function EditorPage(props: EditorPageProps) {
	return (
		<div
			className={style({
				display: "flex",
				flexDirection: "column",
				gap: 16,
				padding: 16,
			})}
		>
			<Header />
			<InformationPanel />
			<WorkflowPanel
				archive={props.archive}
				jsonUpload={props.jsonUpload}
				onDownloadJson={props.onDownloadJson}
				onDownloadSave={props.onDownloadSave}
				onJsonFile={props.onJsonFile}
				onSaveFile={props.onSaveFile}
				saveError={props.saveError}
				saveFileName={props.saveFileName}
			/>
			<FieldEditorPanel
				jsonDocument={props.jsonDocument}
				onUpdateJson={props.onUpdateJson}
			/>
			<EditorLinks />
		</div>
	);
}

function EditorContent(props: EditorPageProps) {
	return (
		<div
			className={style({
				marginX: "auto",
				maxWidth: 1000,
			})}
		>
			<div
				className={style({
					display: "flex",
					flexDirection: "column",
					gap: 16,
				})}
			>
				<EditorPage
					archive={props.archive}
					jsonDocument={props.jsonDocument}
					jsonUpload={props.jsonUpload}
					onDownloadJson={props.onDownloadJson}
					onDownloadSave={props.onDownloadSave}
					onJsonFile={props.onJsonFile}
					onSaveFile={props.onSaveFile}
					onUpdateJson={props.onUpdateJson}
					saveError={props.saveError}
					saveFileName={props.saveFileName}
				/>
			</div>
		</div>
	);
}

function EditorFrame(props: EditorPageProps) {
	return (
		<EditorContent
			archive={props.archive}
			jsonDocument={props.jsonDocument}
			jsonUpload={props.jsonUpload}
			onDownloadJson={props.onDownloadJson}
			onDownloadSave={props.onDownloadSave}
			onJsonFile={props.onJsonFile}
			onSaveFile={props.onSaveFile}
			onUpdateJson={props.onUpdateJson}
			saveError={props.saveError}
			saveFileName={props.saveFileName}
		/>
	);
}

export { EditorFrame };
export type { EditorPageProps };
