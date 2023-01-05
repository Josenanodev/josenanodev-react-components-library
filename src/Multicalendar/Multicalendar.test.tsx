/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/state/store";
import Multicalendar from "./Multicalendar";

test("renders multicalendar", () => {
  const Wrapper = (
    <Provider store={store}>
      <Multicalendar
        cellsChildren={<div></div>}
        listElementsChildren={<div></div>}
        listElementsIdsArray={[]}
      />
    </Provider>
  );
  render(Wrapper);
  const divElement = screen.getByTestId("multicalendar");
  expect(divElement).toBeInTheDocument();
});
