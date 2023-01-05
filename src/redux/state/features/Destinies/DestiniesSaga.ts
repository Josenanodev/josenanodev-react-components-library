import { put, takeLatest, call } from "@redux-saga/core/effects";
import { AxiosResponse } from "axios";
import { apiCallMiddleware } from "../../../ApiCalls/apiCallMiddleware";
import {
  getCountries,
  getCountriesSuccess,
  getCountriesError,
  getRegionsSuccess,
  getRegionsError,
  getProvincesSuccess,
  getProvincesError,
  getMunicipalitiesSuccess,
  getMunicipalitiessError,
  getRegions,
  getProvinces,
  getMunicipalities,
} from "./DestiniesReducer";
import executeMiddlewareForRequests from "../../../ApiCalls/executeMiddlewareForRequests";
import {
  DestiniesReducerStateType,
  SagaActionParamsType,
} from "../../../../common/types";

export function* getCountriesSaga({ payload }: SagaActionParamsType<{}>): Generator {
  try {
    const result = yield call(apiCallMiddleware, "DE1", payload, {
      "Content-Type": "application/json",
    });
    let countries: DestiniesReducerStateType["countries"];
    if (executeMiddlewareForRequests("DE1")) {
      countries = (result as AxiosResponse).data.data;
    } else {
      countries = (result as AxiosResponse).data;
    }
    yield put(getCountriesSuccess(countries));
  } catch (error) {
    console.log("Error en getCountriesSaga", error);
    yield put(getCountriesError());
  }
}
export function* getRegionsSaga({ payload }: SagaActionParamsType<{}>): Generator {
  try {
    const result = yield call(apiCallMiddleware, "DE2", payload, {
      "Content-Type": "application/json",
    });
    let regions: DestiniesReducerStateType["regions"];
    if (executeMiddlewareForRequests("DE2")) {
      regions = (result as AxiosResponse).data.data;
    } else {
      regions = (result as AxiosResponse).data;
    }
    yield put(getRegionsSuccess(regions));
  } catch (error) {
    console.log("Error en getRegionsSaga", error);
    yield put(getRegionsError());
  }
}
export function* getProvincesSaga({ payload }: SagaActionParamsType<{}>): Generator {
  try {
    const result = yield call(apiCallMiddleware, "DE3", payload, {
      "Content-Type": "application/json",
    });
    let provinces: DestiniesReducerStateType["provinces"];
    if (executeMiddlewareForRequests("DE3")) {
      provinces = (result as AxiosResponse).data.data;
    } else {
      provinces = (result as AxiosResponse).data;
    }
    yield put(getProvincesSuccess(provinces));
  } catch (error) {
    console.log("Error en getProvincesSaga", error);
    yield put(getProvincesError());
  }
}
export function* getMunicipalitiesSaga({ payload }: SagaActionParamsType<{}>): Generator {
  try {
    const result = yield call(apiCallMiddleware, "DE4", payload, {
      "Content-Type": "application/json",
    });
    let municipalities: DestiniesReducerStateType["municipalities"];
    if (executeMiddlewareForRequests("DE4")) {
      municipalities = (result as AxiosResponse).data.data;
    } else {
      municipalities = (result as AxiosResponse).data;
    }
    yield put(getMunicipalitiesSuccess(municipalities));
  } catch (error) {
    console.log("Error en getMunicipalitiesSaga", error);
    yield put(getMunicipalitiessError());
  }
}

export default function* AppSettingsSaga() {
  yield takeLatest(getCountries.type, getCountriesSaga);
  yield takeLatest(getRegions.type, getRegionsSaga);
  yield takeLatest(getProvinces.type, getProvincesSaga);
  yield takeLatest(getMunicipalities.type, getMunicipalitiesSaga);
}
