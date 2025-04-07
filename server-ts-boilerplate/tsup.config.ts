import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    splitting: true,
    sourcemap: true,
    clean: true,

    outDir: "dist",
    format: ["esm"],
    target: "es2022",
    // dts: true,
    // minify: true,
    
});
