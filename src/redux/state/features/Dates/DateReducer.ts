import { RootState } from "../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//Types
import { DatesReducerStateType } from "../../../../common/types";

const initialState: DatesReducerStateType = {
  draggingOverDateCells: false,
};

export const datesSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    setDraggingOverDateCells: (
      state,
      action: PayloadAction<DatesReducerStateType["draggingOverDateCells"]>
    ) => {
      state.draggingOverDateCells = action.payload;
    },
  },
});

//Selectors
export const draggingOverDateCellsSelector = (state: RootState) => state.dates.draggingOverDateCells;

//Actions
export const { setDraggingOverDateCells } = datesSlice.actions;

export default datesSlice.reducer;
