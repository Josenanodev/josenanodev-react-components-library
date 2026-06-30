// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from "node:module";
import type { StorybookConfig } from "@storybook/react-webpack5";
const require = createRequire(import.meta.url);
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", {
    name: "@storybook/addon-styling",
    options: {
      sass: {
        // Require your preprocessor
        implementation: require("sass"),
      },
    },
  }, "@storybook/addon-webpack5-compiler-babel", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    defaultName: "Documentation"
  },
};
export default config;
