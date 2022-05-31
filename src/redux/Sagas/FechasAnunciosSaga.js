import { put, takeLatest } from "redux-saga/effects";
import {
  apiGetInformacionFechasAnuncios,
  apiGetListadoAnunciosIds,
} from "../../APIdummy/APIdummy";
import * as types from "../actionTypes";

export function* getInformacionFechasAnunciosSaga({ payload }) {
  try {
    const resultados = yield apiGetInformacionFechasAnuncios(
      payload.listaAnuncios,
      payload.fechaInicio,
      payload.fechaFin
    );
    yield put({
      type: types.GET_INFORMACION_FECHAS_ANUNCIOS_SUCCESS,
      resultados,
    });
  } catch (error) {
    yield put({ type: types.GET_INFORMACION_FECHAS_ANUNCIOS_ERROR, payload });
  }
}

export function* getListadoAnunciosIdsSaga({ payload }) {
  try {
    const resultados = yield apiGetListadoAnunciosIds();
    yield put({
      type: types.GET_LISTADO_ANUNCIOS_IDS_SUCCESS,
      resultados,
    });
  } catch (error) {
    yield put({ type: types.GET_LISTADO_ANUNCIOS_IDS_ERROR, payload });
  }
}

export default function* ComparadorSagas() {
  yield takeLatest(
    types.GET_INFORMACION_FECHAS_ANUNCIOS,
    getInformacionFechasAnunciosSaga
  );
  yield takeLatest(types.GET_LISTADO_ANUNCIOS_IDS, getListadoAnunciosIdsSaga);
}
