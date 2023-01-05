import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//Consts
import { RootState } from "../../store";

//Types
import {
  NotificationsReducerStateType,
  QuickNotificationsType,
} from "../../../../common/types";

const initialState: NotificationsReducerStateType = {
  quickNotifications: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    createNewNotification: (state, action: PayloadAction<QuickNotificationsType>) => {
      state.quickNotifications = [...state.quickNotifications, action.payload];
    },
  },
});

//Selctors
export const quickNotificationsSelector = (state: RootState) =>
  state.notifications.quickNotifications;

//Actions
export const { createNewNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
