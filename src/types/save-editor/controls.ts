import type { JsonUpdate } from "@/utils/save-editor/json";
import type { WorldEntry } from "@/utils/save-editor/world-entries";

interface ControlBaseProps<T> {
	def: T;
	entry: WorldEntry | undefined;
	onUpdateJson: JsonUpdate;
}

export type { ControlBaseProps };
