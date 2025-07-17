import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn", // or "error" if you want it to fail deployment
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      // 🛑 Disable this if TypeScript throws 'Type does not satisfy constraint'
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      // 👇 Optional: allow bypassing props typing or generics
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',

      // Optional: disable prop-types warning if using TypeScript
      'react/prop-types': 'off',

      // OPTIONAL: if you're okay with type assertions like `as any`
      '@typescript-eslint/ban-ts-comment': 'off',
    }
    
  }
 
];



