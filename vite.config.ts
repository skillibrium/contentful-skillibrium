import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, "./src/main.ts"),
			name: "Contentful Skillibrium",
			fileName: "contentful-skillibrium",
		},
	},
});
