import { createFileRoute } from "@tanstack/react-router";

import { SaveEditor } from "@/components/save-editor/save-editor";

const Route = createFileRoute("/")({
	component: SaveEditor,
});

export { Route };
