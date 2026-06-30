export const componentDescriptions = {
  AlertModal:
    "A modal dialog for status, confirmation, and decision flows. Use it when the user must acknowledge a success, error, warning, info message, or question before continuing.",
  BubbleMenu:
    "A fixed-position floating action menu with animated circular options. It is useful for compact mobile-style navigation and quick actions over dense screens.",
  CalendarDatePicker:
    "A visual date picker for single-date, multiple-date, range, and booking-style selection. It supports localized labels, min/max limits, and custom date annotations.",
  InputBoxWithConfirmation:
    "An inline editable input that separates draft input from confirmed value. It is useful for small forms, settings, quantities, and editable labels.",
  IntegerControl:
    "A compact numeric stepper with increment and decrement buttons. It clamps values to optional minimum and maximum limits.",
  LabeledInput:
    "A floating-label input with optional validation state and built-in formatting helpers for card number, expiration date, CVV, and phone values.",
  Modal:
    "A controlled portal-based overlay. It handles backdrop visibility, outside-click closing, and forced modals that must be closed by the parent UI.",
  Multicalendar:
    "A virtualized availability calendar for resource-by-date grids. It is built for property management and booking interfaces with many rows and long date ranges.",
  ScreenSteps:
    "A stepper layout for multi-step flows. It animates between step panels and can optionally let users navigate back to previous or future steps.",
  ScrollSnapGallery:
    "A horizontal image gallery built on native CSS scroll snap. It supports indicators, optional arrows, custom indicator icons, and auto-advance.",
  StackedCards:
    "An interactive card stack for browsing a small collection of panels. It supports controlled selection and configurable stack angle and card size.",
};

export const storyDescriptions = {
  AlertModalDefault:
    "Demonstrates a controlled success alert with confirm and cancel actions. Use this pattern for status feedback that needs explicit acknowledgement.",
  BubbleMenuDefault:
    "Shows the core floating menu interaction with three visible quick actions.",
  BubbleMenuAEP:
    "Shows the menu layered over another interactive component, which is useful for checking z-index, backdrop, and fixed-position behavior.",
  CalendarDatePickerDefault:
    "Shows custom date rules, min/max navigation limits, and a responsive full-width calendar surface.",
  CalendarDatePickerSingle:
    "Demonstrates single-date selection for simple due-date, arrival-date, or appointment flows.",
  CalendarDatePickerRange:
    "Demonstrates range selection for start/end workflows such as availability or reservation windows.",
  CalendarDatePickerMultiple:
    "Demonstrates non-contiguous multiple-date selection for flexible date picking.",
  CalendarDatePickerBooking:
    "Demonstrates booking-style selection where check-in and check-out dates receive distinct visual treatment.",
  InputBoxWithConfirmationDefault:
    "Shows the default confirm-on-commit behavior for compact editable values.",
  IntegerControlDefault:
    "Shows the base numeric stepper and emitted value changes.",
  LabeledInputDefault:
    "Shows the default floating-label input for common form fields.",
  LabeledInputDifferentBackground:
    "Shows how the input adapts when placed on a custom background color.",
  LabeledInputWithError:
    "Shows the validation state with an error border, label color, and helper text.",
  ModalDefault:
    "Shows a controlled modal that can close from backdrop interaction.",
  ModalForced:
    "Shows a forced modal that must be closed by explicit UI, useful for blocking decisions.",
  MulticalendarDefault:
    "Shows the virtualized resource/date grid with custom row and cell renderers.",
  ScreenStepsDefault:
    "Shows an animated three-step flow with panels of different heights.",
  ScrollSnapGalleryDefault:
    "Shows the base scroll-snap gallery with indicator dots.",
  ScrollSnapGalleryCabinsGallery:
    "Shows a branded gallery variant with custom indicator icons, arrows, frame styling, and real image content.",
  StackedCardsDefault:
    "Shows a larger stack with mixed text and media cards.",
  StackedCardsTwoCards:
    "Shows the layout behavior with a minimal two-card stack.",
};

export const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const commonArgTypes = {
  onChange: {
    description: "Called when the component emits a new value.",
  },
  customStyle: {
    description: "Inline style object applied to the root component element.",
    control: "object",
  },
};

export const alertModalArgTypes = {
  type: {
    description: "Visual intent for the modal icon.",
    control: "select",
    options: ["success", "error", "warning", "info", "question"],
  },
  title: { description: "Optional heading rendered above the message." },
  message: { description: "Short body copy for the alert." },
  customChildren: {
    description: "Custom React content rendered between the message and actions.",
    control: false,
  },
  confirmText: { description: "Text for the confirm button." },
  cancelText: { description: "Text for the cancel button." },
  confirmButton: { description: "Whether the confirm button is rendered." },
  cancelButton: { description: "Whether the cancel button is rendered." },
  overrideOpenState: {
    description: "Controls whether the modal is open from the parent.",
  },
  forced: {
    description: "When true, clicking the backdrop does not close the modal.",
  },
  iconSize: { description: "Icon size in pixels." },
  iconColor: { description: "Overrides the default icon color." },
  onConfirm: { description: "Called after the confirm button is clicked." },
  onCancel: { description: "Called after the cancel button is clicked." },
};

export const bubbleMenuArgTypes = {
  options: {
    description:
      "Visible menu options. Each item receives an icon, text, visibility flag, and callback.",
    control: "object",
  },
  language: {
    description: "Language used for the open/close button label.",
    control: "select",
    options: ["en", "es"],
  },
};

export const calendarDatePickerArgTypes = {
  mode: {
    description: "Selection behavior used by the calendar.",
    control: "select",
    options: ["single", "multiple", "range", "booking"],
  },
  onSelectedDatesChange: {
    description: "Called whenever the selected Date array changes.",
  },
  language: {
    description: "Language used for month, weekday, and Today labels.",
    control: "select",
    options: ["en", "es"],
  },
  customDates: {
    description:
      "Date annotations with color, selectable state, crossed state, and optional click behavior.",
    control: "object",
  },
  minimumDate: { description: "Earliest month/day the user can navigate to." },
  maximumDate: { description: "Latest month/day the user can navigate to." },
  customStyle: commonArgTypes.customStyle,
};

export const inputBoxWithConfirmationArgTypes = {
  onConfirmAction: {
    description: "Called with the committed string value after confirm, Enter, or blur.",
  },
  inputType: {
    description: "Native input type used by the inner input.",
    control: "select",
    options: ["text", "number"],
  },
  minimumValue: { description: "Minimum value applied when inputType is number." },
  maximumValue: { description: "Maximum value applied when inputType is number." },
  maxLength: { description: "Maximum number of characters accepted." },
  placeholder: { description: "Placeholder shown while the input is empty." },
  divWrapperCustomStyle: {
    description: "Inline styles for the outer wrapper.",
    control: "object",
  },
  inputBoxCustomStyle: {
    description: "Inline styles for the inner input.",
    control: "object",
  },
  defaultValue: { description: "Initial value shown by the input." },
  overrideCurrentValue: {
    description:
      "Controlled value override. Pass null to clear both current and cached value.",
  },
  showConfirmationButton: {
    description: "Shows an edit/check button instead of confirming immediately on blur.",
  },
  disabled: { description: "Disables the inner input and hides edit controls." },
};

export const integerControlArgTypes = {
  onChange: commonArgTypes.onChange,
  defaultValue: { description: "Initial numeric value." },
  minimumValue: { description: "Lowest value allowed by the stepper." },
  maximumValue: { description: "Highest value allowed by the stepper." },
  customStyle: commonArgTypes.customStyle,
};

export const labeledInputArgTypes = {
  label: { description: "Floating label text." },
  defaultValue: { description: "Initial uncontrolled input value." },
  onChange: {
    description: "Called with the formatted string value whenever the user types.",
  },
  width: { description: "CSS width applied to the root wrapper." },
  height: { description: "CSS height applied to the root wrapper." },
  backgroundColor: {
    description: "Background color for the wrapper and floating label gap.",
  },
  textAlign: {
    description: "Text alignment applied to the inner input.",
    control: "select",
    options: ["left", "center", "right"],
  },
  highlightError: { description: "Enables the validation/error visual state." },
  errorMessage: { description: "Validation message rendered below the input." },
  inputProps: {
    description: "Additional props forwarded to the native input element.",
    control: "object",
  },
  specialType: {
    description: "Optional formatter applied while typing.",
    control: "select",
    options: ["credit-card-number", "expiration-date", "cvv", "phone"],
  },
};

export const modalArgTypes = {
  children: { description: "React content rendered inside the modal.", control: false },
  overrideOpenState: {
    description: "Controls whether the modal is open from the parent.",
  },
  forced: {
    description: "When true, backdrop clicks do not close the modal.",
  },
  onOpen: { description: "Called when overrideOpenState opens the modal." },
  onClose: { description: "Called when the modal closes." },
  transitionTime: {
    description:
      "Reserved prop for transition duration. Current implementation uses the CSS timing.",
  },
};

export const multicalendarArgTypes = {
  multicalendarId: {
    description:
      "Stable DOM/storage id. Use a unique id per calendar, especially when autoSavePosition is enabled.",
  },
  ReactCellChildren: {
    description:
      "Component rendered inside each visible date/resource cell. Receives date and listElementId.",
    control: false,
  },
  ReactListElementChildren: {
    description:
      "Component rendered in the left resource column. Receives listElementId.",
    control: false,
  },
  listElementsIdsArray: {
    description: "Resource ids displayed as rows in the calendar grid.",
    control: "object",
  },
  language: {
    description: "Language used by the Today control and month navigation.",
    control: "select",
    options: ["en_EN", "es_ES"],
  },
  pastDatesVisible: { description: "Whether dates before today are rendered." },
  cellsWidth: { description: "Width in pixels for each date cell." },
  cellsHeight: { description: "Height in pixels for each resource row." },
  verticalAxisWidth: { description: "Width in pixels of the resource axis." },
  horizontalAxisHeight: {
    description: "Reserved height setting for the horizontal date axis.",
  },
  pastDaysInitialQuantity: {
    description: "Initial number of past days available in the horizontal range.",
  },
  futureDaysInitialQuantity: {
    description: "Initial number of future days available in the horizontal range.",
  },
  chunkRenderX: {
    description: "Extra horizontal cells rendered before/after the visible viewport.",
  },
  chunkRenderY: {
    description: "Extra vertical rows rendered before/after the visible viewport.",
  },
  authomaticScrollOnDraggingOverEdges: {
    description: "Auto-scrolls the grid while dragging near its edges.",
  },
  dynamicDaysQuantity: {
    description: "Extends the date range when the user scrolls near either edge.",
  },
  waitTimeForCalls: {
    description: "Debounce time in milliseconds before callsOnScrollingStops fires.",
  },
  callsOnInitialView: {
    description: "Called once with the initially visible ids and dates.",
  },
  callsOnScrollingStops: {
    description: "Called after scrolling settles with currently visible ids and dates.",
  },
  aditionalControlsComponents: {
    description: "Extra React controls rendered in the calendar toolbar.",
    control: false,
  },
  upperLeftComponent: {
    description: "React content rendered in the top-left corner above the resource axis.",
    control: false,
  },
  autoSavePosition: {
    description: "Persists scroll position in sessionStorage using multicalendarId.",
  },
  onScrollTopChanges: { description: "Called when the vertical scroll position changes." },
  onScrollLeftChanges: {
    description: "Called when the horizontal scroll position changes.",
  },
};

export const screenStepsArgTypes = {
  steps: {
    description:
      "Ordered step definitions. Each step has visible nav text, optional outside text, and a React panel.",
    control: "object",
  },
  defaultStep: { description: "Initial step index." },
  onStepChange: { description: "Called with the selected step index." },
  canNavigate: { description: "Allows clicking step markers to navigate." },
  overrideStep: { description: "Controlled step index from the parent." },
};

export const scrollSnapGalleryArgTypes = {
  urls: { description: "Image URLs rendered as slides.", control: "object" },
  alts: { description: "Optional alt text array matched by slide index.", control: "object" },
  width: { description: "CSS width of the scroll frame." },
  height: { description: "CSS height of the scroll frame." },
  IndicatorIcon: { description: "React icon component used for slide indicators." },
  positionIndicatorSize: {
    description: "Maximum number of indicator icons emphasized at one time.",
  },
  iconSize: { description: "Indicator icon size in pixels." },
  showArrows: { description: "Shows previous/next arrow controls." },
  frameStyle: {
    description: "Inline styles applied to the image frame.",
    control: "object",
  },
  onSlideChange: { description: "Called with the active slide index." },
  autoChange: { description: "Automatically advances slides every 3 seconds." },
};

export const stackedCardsArgTypes = {
  cards: {
    description: "Card data. Each card receives React title and content nodes.",
    control: "object",
  },
  initialCard: { description: "Initially selected card index." },
  onCardChangeByUser: {
    description: "Called when the user selects a different card.",
  },
  overrideSelectedCard: {
    description: "Controlled selected card index from the parent.",
  },
  stackingOrientation: {
    description:
      "Stack angle in degrees. Positive and negative values rotate the card spread.",
  },
  cardHeight: { description: "Card height in pixels." },
  cardWidth: { description: "Card width in pixels." },
};
