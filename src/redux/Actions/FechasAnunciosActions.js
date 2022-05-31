import * as types from "../actionTypes";
//NO SAGAS
export const setReservacionEnfocada = (payload) => {
  return {
    type: types.SET_RESERVACION_ENFOCADA,
    payload,
  };
};
export const reiniciarReservacionEnfocada = () => {
  return {
    type: types.REINICIAR_RESERVACION_ENFOCADA,
  };
};
export const setRangoFechasAnunciosSeleccionado = (payload) => {
  return {
    type: types.SET_RANGO_FECHAS_ANUNCIOS_SELECCIONADO,
    payload,
  };
};
export const reiniciarRangoFechasAnunciosSeleccionado = () => {
  return {
    type: types.REINICIAR_RANGO_FECHAS_ANUNCIOS_SELECCIONADO,
  };
};
//SAGAS
export const getInformacionFechasAnuncios = (payload) => {
  return {
    type: types.GET_INFORMACION_FECHAS_ANUNCIOS,
    payload,
  };
};

export const getListadosAnunciosIds = (payload) => {
  return {
    type: types.GET_LISTADO_ANUNCIOS_IDS,
    payload,
  };
};
