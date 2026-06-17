import "@react-spectrum/s2/page.css";
import { Provider } from "@react-spectrum/s2/Provider";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import {
	HeadContent,
	Outlet,
	Scripts,
	useRouter,
} from "@tanstack/react-router";
import { useMemo } from "react";
import type { ComponentProps, ReactNode } from "react";

type SpectrumRouter = NonNullable<ComponentProps<typeof Provider>["router"]>;

const bodyClassName = style({
	backgroundImage: "url(/images/background.jpg)",
	backgroundPosition: "center",
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
	font: "body",
	margin: 0,
	minHeight: "screen",
});

interface RootDocumentProps {
	children: ReactNode;
}

function RootDocument({ children }: RootDocumentProps) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className={bodyClassName}>
				{children}
				<Scripts />
			</body>
		</html>
	);
}

function RootLayout() {
	const router = useRouter();
	const spectrumRouter = useMemo<SpectrumRouter>(
		() => ({
			navigate: (href, opts) => {
				if (typeof href === "string") {
					return;
				}

				void router.navigate({ ...opts });
			},
			useHref: (href) => {
				if (typeof href === "string") {
					return href;
				}

				return router.buildLocation(href).href;
			},
		}),
		[router],
	);

	return (
		<RootDocument>
			<Provider router={spectrumRouter}>
				<Outlet />
			</Provider>
		</RootDocument>
	);
}

export { RootLayout };
