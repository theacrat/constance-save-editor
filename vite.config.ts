import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import macros from "unplugin-parcel-macros";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		macros.vite(),
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tanstackStart(),
		viteReact(),
	],
	resolve: {
		alias: {
			"@": "/src",
		},
	},
	server: {
		port: 3000,
	},
	ssr: {
		noExternal: ["@react-spectrum/s2"],
	},
});
