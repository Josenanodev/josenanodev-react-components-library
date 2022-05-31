import { get } from "lodash";
// NO SAGAS
export const reservacionEnfocada = (state) =>
  get(state, "FechasAnunciosReducer.reservacionEnfocada");
export const rangoFechaAnunciosSeleccionado = (state) =>
  get(state, "FechasAnunciosReducer.rangoFechaAnunciosSeleccionado");
//SAGAS
export const fechasAnuncios = (state) =>
  get(state, "FechasAnunciosReducer.fechasAnuncios");
export const listadosAnunciosIds = (state) =>
  get(state, "FechasAnunciosReducer.listadosAnunciosIds");
