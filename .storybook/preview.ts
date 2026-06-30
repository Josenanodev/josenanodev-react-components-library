import type { Preview } from "@storybook/react-webpack5";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
      source: {
        state: "open",
      },
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "CalendarDatePicker",
          "Multicalendar",
          "LabeledInput",
          "InputBoxWithConfirmation",
          "IntegerControl",
          "Modal",
          "AlertModal",
          "BubbleMenu",
          "ScreenSteps",
          "ScrollSnapGallery",
          "StackedCards",
        ],
      },
    },
  },
};

export default preview;
