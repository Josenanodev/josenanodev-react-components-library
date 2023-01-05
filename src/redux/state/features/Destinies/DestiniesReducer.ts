import { RootState } from "../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//Types
import { DestiniesReducerStateType } from "../../../../common/types";

const initialState: DestiniesReducerStateType = {
  countries: [],
  regions: [],
  provinces: [],
  municipalities: [],
  mixedDestinies: [
    {
      code: "1",
      name: "España",
      type: "country",
    },
  ],
};

export const destiniesSlice = createSlice({
  name: "destinies",
  initialState,
  reducers: {
    getCountries: () => {},
    getCountriesSuccess: (
      state,
      action: PayloadAction<DestiniesReducerStateType["countries"]>
    ) => {
      state.countries = action.payload;
    },
    getCountriesError: (state) => {
      state.countries = [];
    },
    getRegions: () => {},
    getRegionsSuccess: (
      state,
      action: PayloadAction<DestiniesReducerStateType["regions"]>
    ) => {
      state.regions = action.payload;
    },
    getRegionsError: (state) => {
      state.regions = [];
    },
    getProvinces: () => {},
    getProvincesSuccess: (
      state,
      action: PayloadAction<DestiniesReducerStateType["provinces"]>
    ) => {
      state.provinces = action.payload;
    },
    getProvincesError: (state) => {
      state.provinces = [];
    },
    getMunicipalities: () => {},
    getMunicipalitiesSuccess: (
      state,
      action: PayloadAction<DestiniesReducerStateType["municipalities"]>
    ) => {
      state.municipalities = action.payload;
    },
    getMunicipalitiessError: (state) => {
      state.municipalities = [];
    },
  },
});

//Selectors
export const countriesSelector = (state: RootState) => state.destinies.countries;
export const regionsSelector = (state: RootState) => state.destinies.regions;
export const provincesSelector = (state: RootState) => state.destinies.provinces;
export const municipalitiesSelector = (state: RootState) =>
  state.destinies.municipalities;
export const mixedDestiniesSelector = (state: RootState) =>
  state.destinies.mixedDestinies;

//Actions
export const {
  getCountries,
  getCountriesSuccess,
  getCountriesError,
  getRegions,
  getRegionsSuccess,
  getRegionsError,
  getProvinces,
  getProvincesSuccess,
  getProvincesError,
  getMunicipalities,
  getMunicipalitiesSuccess,
  getMunicipalitiessError,
} = destiniesSlice.actions;

export default destiniesSlice.reducer;
