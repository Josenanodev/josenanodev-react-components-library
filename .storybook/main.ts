// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from "node:module";
import type { StorybookConfig } from "@storybook/react-webpack5";
const require = createRequire(import.meta.url);
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", {
    name: "@storybook/addon-styling-webpack",
    options: {
      rules: [
        {
          test: /\.css$/i,
          use: [require.resolve("style-loader"), require.resolve("css-loader")],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            require.resolve("style-loader"),
            {
              loader: require.resolve("css-loader"),
              options: {
                modules: {
                  auto: /\.module\.s[ac]ss$/i,
                  localIdentName: "[name]__[local]--[hash:base64:5]",
                  namedExport: false,
                  exportLocalsConvention: "as-is",
                },
              },
            },
            {
              loader: require.resolve("sass-loader"),
              options: {
                implementation: require("sass"),
              },
            },
          ],
        },
      ],
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
