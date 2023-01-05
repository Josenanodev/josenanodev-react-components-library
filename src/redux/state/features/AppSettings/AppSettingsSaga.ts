import { put, takeLatest, call } from "@redux-saga/core/effects";
import { AxiosResponse } from "axios";
import { apiCallMiddleware } from "../../../ApiCalls/apiCallMiddleware";
import { propertyManagerLookAndFeelCode } from "../../../../common/constants";
import {
  getLookAndFeel,
  getLookAndFeelError,
  getLookAndFeelSuccess,
} from "./AppSettingsReducer";
import executeMiddlewareForRequests from "../../../ApiCalls/executeMiddlewareForRequests";
import {
  AppSettingsReducerStateType,
  SagaActionParamsType,
} from "../../../../common/types";

export function* getLookAndFeelSaga({
  payload,
}: SagaActionParamsType<{ propertyManagerLookAndFeelCode?: string }>): Generator {
  if (!payload) payload = {};
  if (propertyManagerLookAndFeelCode !== undefined) {
    payload.propertyManagerLookAndFeelCode = propertyManagerLookAndFeelCode;
  }
  try {
    const result = yield call(apiCallMiddleware, "AP1", payload, {
      "Content-Type": "application/json",
    });
    let lookAndFeel: AppSettingsReducerStateType["lookAndFeel"];
    if (executeMiddlewareForRequests("AP1")) {
      lookAndFeel = (result as AxiosResponse).data.data;
    } else {
      lookAndFeel = (result as AxiosResponse).data;
    }
    yield put(getLookAndFeelSuccess(lookAndFeel));
  } catch (error) {
    console.log("Error en getLookAndFeelSaga", error);

    yield put(getLookAndFeelError());
  }
}

export default function* AppSettingsSaga() {
  yield takeLatest(getLookAndFeel.type, getLookAndFeelSaga);
}
