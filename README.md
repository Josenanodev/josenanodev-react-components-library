# Josenanodev React Components Library

[![npm version](https://img.shields.io/npm/v/josenanodev-react-components-library.svg)](https://www.npmjs.com/package/josenanodev-react-components-library)
[![license](https://img.shields.io/npm/l/josenanodev-react-components-library.svg)](./LICENSE)
[![types](https://img.shields.io/badge/types-TypeScript-blue.svg)](./dist/index.d.ts)

Reusable React components and hooks for product interfaces, booking flows, property-management tools, and compact utility UI.

The package ships TypeScript declarations and bundled component styles. Most components use CSS Modules internally, so consumers can import and render the components without manually importing a global stylesheet.

## Why This Library Exists

This library collects UI patterns I have needed repeatedly while building operational web tools: availability calendars, editable form controls, modal flows, image galleries, and compact navigation. The components favor practical application screens over marketing pages: predictable behavior, typed props, encapsulated styles, and Storybook examples that document real usage.

## Quality Signals

- TypeScript-first component APIs with generated declaration files.
- Storybook documentation for every exported component.
- CSS Modules for component-scoped styling.
- Rollup builds for CommonJS, ES modules, and bundled declarations.
- npm Trusted Publisher/provenance-ready release workflow.
- Moderate-or-higher npm audit currently clean.

## Installation

```bash
npm install josenanodev-react-components-library
```

Peer dependencies:

```bash
npm install react react-dom react-icons
```

## Quick Start

```tsx
import { BsSearch } from "react-icons/bs";
import {
  BubbleMenu,
  CalendarDatePicker,
  IntegerControl,
  LabeledInput,
} from "josenanodev-react-components-library";

export function BookingForm() {
  return (
    <section>
      <LabeledInput
        label="Guest name"
        onChange={(value) => console.log(value)}
      />

      <IntegerControl
        defaultValue={2}
        minimumValue={1}
        maximumValue={8}
        onChange={(value) => console.log(value)}
      />

      <CalendarDatePicker
        mode="range"
        onSelectedDatesChange={(dates) => console.log(dates)}
      />
    </section>
  );
}
```

## Components

All public components are documented in Storybook with usage guidance, prop descriptions, and live examples.

### AlertModal

Status and confirmation modal for success, error, warning, info, and question flows.

```tsx
<AlertModal
  overrideOpenState={isOpen}
  type="success"
  title="Saved"
  message="Your changes were saved."
  onConfirm={() => setIsOpen(false)}
  onCancel={() => setIsOpen(false)}
/>
```

### BubbleMenu

Floating action menu for compact navigation or quick actions.

```tsx
<BubbleMenu
  language="en"
  options={[
    {
      icon: <BsSearch />,
      text: "Search",
      visible: true,
      optionCallback: openSearch,
    },
  ]}
/>
```

### CalendarDatePicker

Date selector with `single`, `multiple`, `range`, and `booking` modes.

Use `customDates` to mark unavailable days, apply colors, prevent selection, cross out dates, or attach custom click behavior.

### InputBoxWithConfirmation

Inline editable input that separates draft state from confirmed state. It is useful for editable settings and compact numeric/text inputs.

### IntegerControl

Numeric stepper with optional min/max clamping.

### LabeledInput

Floating-label input with optional error state and formatting helpers:

- `credit-card-number`
- `expiration-date`
- `cvv`
- `phone`

### Modal

Controlled portal overlay. Use `forced` when the user must close the modal through explicit UI rather than the backdrop.

### Multicalendar

Virtualized date-by-resource grid for availability and booking tools.

Important props:

- `multicalendarId`: stable id used by the DOM and sessionStorage position cache.
- `ReactCellChildren`: component rendered in each date/resource cell.
- `ReactListElementChildren`: component rendered in the resource axis.
- `listElementsIdsArray`: row ids displayed by the grid.
- `callsOnInitialView`: receives initially visible ids and dates.
- `callsOnScrollingStops`: receives visible ids and dates after scrolling settles.

### ScreenSteps

Animated stepper for multi-step workflows.

### ScrollSnapGallery

Image gallery using native CSS scroll snap. Supports indicator icons, arrows, and optional auto-advance.

### StackedCards

Interactive card stack with configurable card size and stack orientation.

## Hooks

The package also exports utility hooks:

- `useIntersectionObserver(ref, options)`: returns whether the element is intersecting.
- `useOutsideClick(ref, callback, excludedRefs?)`: calls a callback when the user clicks outside a ref.
- `useResizeObserver(ref)`: returns `[width, height]` for the observed element.
- `useWindowsSize()`: returns `[windowWidth, windowHeight]`.

## Development

```bash
npm install
npm run storybook
```

Build and verify locally:

```bash
npm run tsc
npm run rollup-build-lib
npm run build-storybook
npm audit --audit-level=moderate
```

## Publishing Notes

The package is configured for npm publishing from GitHub Actions with npm Trusted Publisher/provenance support. Keep the npm package Trusted Publisher connection aligned with the workflow file used for publishing.

## License

MIT
