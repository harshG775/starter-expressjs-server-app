import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.node } },
    { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
    tseslint.configs.recommended,
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    args: "all",
                    argsIgnorePattern: "^[A-Z_]",
                    caughtErrors: "all",
                    caughtErrorsIgnorePattern: "^[A-Z_]",
                    destructuredArrayIgnorePattern: "^[A-Z_]",
                    varsIgnorePattern: "^[A-Z_]",
                    ignoreRestSiblings: true,
                },
            ],
        },
    },
    { ignores: ["**/dist/**"] },
]);
