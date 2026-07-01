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
          "Documentation",
          ["Introduction"],
          "Booking And Availability",
          ["CalendarDatePicker", "Multicalendar"],
          "Forms And Inputs",
          ["LabeledInput", "InputBoxWithConfirmation", "IntegerControl"],
          "Overlays And Navigation",
          ["Modal", "AlertModal", "BubbleMenu", "ScreenSteps"],
          "Media And Layout",
          ["ScrollSnapGallery", "StackedCards"],
        ],
      },
    },
  },
};

export default preview;
