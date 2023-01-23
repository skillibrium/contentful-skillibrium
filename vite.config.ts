import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, "./src/contentful-mm.ts"),
			name: "MMContentful",
			fileName: "contentful-mm",
			formats: ["iife"],
		},
	},
});
