import { useCallback } from "react";

import { NumberControl } from "@/components/save-editor/controls/control-elements";
import { isJsonObject } from "@/utils/save-editor/json";
import type { JsonUpdate } from "@/utils/save-editor/json";

interface PlayerStatControlProps {
	id: string;
	label: string;
	onUpdateJson: JsonUpdate;
	playerKey: string;
	value: number;
}

function PlayerStatControl({
	id,
	label,
	onUpdateJson,
	playerKey,
	value,
}: PlayerStatControlProps) {
	const handleChange = useCallback(
		(nextValue: number) => {
			onUpdateJson((draft) => {
				const player = draft["Player"];
				if (isJsonObject(player)) {
					player[playerKey] = nextValue;
				}
			});
		},
		[onUpdateJson, playerKey],
	);

	return (
		<NumberControl
			ariaLabel={label}
			id={id}
			onChange={handleChange}
			value={value}
		/>
	);
}

export { PlayerStatControl };
