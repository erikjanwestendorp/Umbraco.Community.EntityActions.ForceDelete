	import { defineConfig } from "vite";
	
	export default defineConfig({
	    build: {
	        lib: {
	            entry: "src/bundle.manifests.ts", // your web component source file
	            formats: ["es"],
                fileName: "force-delete"
	        },
	        outDir: "../../Umbraco.Community.EntityActions.ForceDelete.Assets/wwwroot", // all compiled files will be placed here
	        emptyOutDir: true,
	        sourcemap: true,
	        rollupOptions: {
	            external: [/^@umbraco/], // ignore the Umbraco Backoffice package in the build
	        },
	    },
	    base: "/App_Plugins/ForceDelete/", // the base path of the app in the browser (used for assets)
	});