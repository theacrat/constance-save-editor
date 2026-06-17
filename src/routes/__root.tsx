import { createRootRoute } from "@tanstack/react-router";
import type { NavigateOptions, ToOptions } from "@tanstack/react-router";

import { RootLayout } from "@/components/root-layout";

declare module "@react-spectrum/s2/Provider" {
	interface RouterConfig {
		href: ToOptions;
		routerOptions: Omit<NavigateOptions, keyof ToOptions>;
	}
}

const Route = createRootRoute({
	component: RootLayout,
	head: () => ({
		meta: [
			{ charSet: "utf8" },
			{ content: "width=device-width, initial-scale=1", name: "viewport" },
			{ title: "Constance Save Editor" },
		],
	}),
});

export { Route };
