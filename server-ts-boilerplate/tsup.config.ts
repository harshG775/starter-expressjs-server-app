import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    splitting: true,
    sourcemap: true,
    clean: true,

    outDir: "dist",
    format: ["cjs"],
    target: "node14",
    // dts: true,
    // minify: true,
    
});
