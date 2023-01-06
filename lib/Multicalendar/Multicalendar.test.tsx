/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import CellChildrenMock from "../mocks/ReactComponentMocksForTesting/CellChildrenMock";
import ListElementChildrenMock from "../mocks/ReactComponentMocksForTesting/ListElementChildrenMock";
import Multicalendar from "./Multicalendar";
import es_ES from "../assets/languages/es-ES";

test("renders multicalendar", () => {
  const Wrapper = (
    <Multicalendar
      multicalendarId="multicalendar-for-unit-testing"
      ReactCellChildren={CellChildrenMock}
      ReactListElementChildren={ListElementChildrenMock}
      listElementsIdsArray={[]}
      language={es_ES}
    />
  );
  render(Wrapper);
  const divElement = screen.getByTestId("multicalendar");
  expect(divElement).toBeInTheDocument();
});
