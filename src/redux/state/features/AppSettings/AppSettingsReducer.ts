import { RootState } from "../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//Assets
import es_ES from "../../../../assets/languages/es-ES";

//Consts
import { propertyManagerCode } from "../../../../common/constants";

//Types
import { AppSettingsReducerStateType } from "../../../../common/types";

const initialState: AppSettingsReducerStateType = {
  view: "multidestiny",
  language: es_ES,
  lookAndFeel: undefined,
};

export const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<AppSettingsReducerStateType["view"]>) => {
      state.view = action.payload;
    },
    setLanguage: (
      state,
      action: PayloadAction<AppSettingsReducerStateType["language"]>
    ) => {
      state.language = action.payload;
    },
    getLookAndFeel: () => {},
    getLookAndFeelSuccess: (
      state,
      action: PayloadAction<AppSettingsReducerStateType["lookAndFeel"]>
    ) => {
      state.lookAndFeel = action.payload;
    },
    getLookAndFeelError: (state) => {
      state.lookAndFeel = {
        code: "",
        logoUrl: "",
        primaryColor: "#ec6321",
        secondaryColor: "#46ba0d",
        fontFamily: "Roboto",
        enabled: true,
        propertyManagerCode: propertyManagerCode,
      };
    },
  },
});

//Selectors
export const viewSelector = (state: RootState) => state.appSettings.view;
export const languageSelector = (state: RootState) => state.appSettings.language;
export const lookAndFeelSelector = (state: RootState) => state.appSettings.lookAndFeel;

//Actions
export const {
  setView,
  setLanguage,
  getLookAndFeel,
  getLookAndFeelSuccess,
  getLookAndFeelError,
} = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
