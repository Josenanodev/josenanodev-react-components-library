import { languageType } from "./assets/languages/types";

export interface customWindow extends Window {
  access: string;
  propertyManagerCode: string;
  propertyManagerLookAndFeelCode: string;
  languageCode: string;
  actionUrl: string;
}

export interface SagaActionParamsType<T> {
  type: string;
  payload: T;
  repeatsLeft: number;
  persistentReduxAction: string;
  reduxError: string;
  showErrorMessage?: boolean;
  millisecondsWait?: number;
}

export interface NotificationsReducerStateType {
  quickNotifications: QuickNotificationsType[];
}

export interface lookAndFeelType {
  code: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: "Roboto" | "Bitter" | "Dosis" | "Figtree" | "Mulish" | "Nunito Sans";
  enabled: boolean;
  propertyManagerCode?: string;
}

export interface AppSettingsReducerStateType {
  view: "multidestiny";
  language: languageType;
  lookAndFeel?: lookAndFeelType;
}

export interface DestiniesReducerStateType {
  countries: CountryType[];
  regions: RegionType[];
  provinces: ProvinceType[];
  municipalities: MunicipalityType[];
  mixedDestinies: DestinyType[];
}

export interface DatesReducerStateType {
  draggingOverDateCells: boolean;
}

export interface QuickNotificationsType {
  text: string;
  creation: Date;
  type: "info" | "error" | "ok";
}

export interface CountryType {
  code: string;
  name: string;
}

export interface RegionType {
  code: string;
  name: string;
  country: {
    code: string;
    name: string;
  };
}

export interface ProvinceType {
  code: string;
  name: string;
  country: {
    code: string;
    name: string;
  };
  region: {
    code: string;
    name: string;
  };
}

export interface MunicipalityType {
  code: string;
  name: string;
  country: {
    code: string;
    name: string;
  };
  region: {
    code: string;
    name: string;
  };
  province: {
    code: string;
    name: string;
  };
}

export type DestinyType = (CountryType | RegionType | ProvinceType | MunicipalityType) & {
  type: "country" | "region" | "province" | "municipality";
};

export type SeasonsType = "high" | "medium high" | "medium" | "medium low" | "low"

export type EventsType = "1" | "2" | "3"

export type HolidaysType = "1" | "2" | "3"

export type OccupationsType = "high" | "medium" | "low"
