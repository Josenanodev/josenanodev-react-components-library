import * as types from "../actionTypes";

const initialState = {
  listadosAnunciosIds: [],
  fechasAnuncios: {},
  reservacionEnfocada: undefined,
  rangoFechaAnunciosSeleccionado: {
    seleccion1: {
      fecha: undefined,
      anuncio: undefined,
      posicionX: undefined,
      posicionY: undefined,
    },
    seleccion2: {
      fecha: undefined,
      anuncio: undefined,
      posicionX: undefined,
      posicionY: undefined,
    },
  },
};

function concadenadorDeNuevasFechasAnuncios(viejaInfo, nuevaInfo) {
  let resultado = Object.assign({}, viejaInfo);
  for (const nuevaInfoAnuncio in nuevaInfo) {
    if (!viejaInfo[nuevaInfoAnuncio]) {
      resultado[nuevaInfoAnuncio] = nuevaInfo[nuevaInfoAnuncio];
    } else {
      for (const fecha in nuevaInfo[nuevaInfoAnuncio]) {
        if (!viejaInfo[nuevaInfoAnuncio][fecha]) {
          resultado[nuevaInfoAnuncio][fecha] =
            nuevaInfo[nuevaInfoAnuncio][fecha];
        }
      }
    }
  }
  return resultado;
}

export default function reservacionesReducer(state = initialState, action) {
  switch (action.type) {
    //NO SAGAS
    case types.SET_RESERVACION_ENFOCADA:
      return {
        ...state,
        reservacionEnfocada: action.payload,
      };
    case types.REINICIAR_RESERVACION_ENFOCADA:
      return {
        ...state,
        reservacionEnfocada: undefined,
      };
    case types.SET_RANGO_FECHAS_ANUNCIOS_SELECCIONADO:
      return {
        ...state,
        rangoFechaAnunciosSeleccionado: {
          seleccion1: {
            fecha: action.payload.seleccion1.fecha,
            anuncio: action.payload.seleccion1.anuncio,
            posicionX: action.payload.seleccion1.posicionX,
            posicionY: action.payload.seleccion1.posicionY,
          },
          seleccion2: {
            fecha: action.payload.seleccion2.fecha,
            anuncio: action.payload.seleccion2.anuncio,
            posicionX: action.payload.seleccion2.posicionX,
            posicionY: action.payload.seleccion2.posicionY,
          },
        },
      };
    case types.REINICIAR_RANGO_FECHAS_ANUNCIOS_SELECCIONADO:
      return {
        ...state,
        rangoFechaAnunciosSeleccionado: {
          seleccion1: { fecha: undefined, anuncio: undefined },
          seleccion2: { fecha: undefined, anuncio: undefined },
        },
      };
    //SAGAS
    case types.GET_INFORMACION_FECHAS_ANUNCIOS:
      return {
        ...state,
      };
    case types.GET_INFORMACION_FECHAS_ANUNCIOS_SUCCESS:
      return {
        ...state,
        fechasAnuncios: concadenadorDeNuevasFechasAnuncios(
          state.fechasAnuncios,
          action.resultados
        ),
      };
    case types.GET_INFORMACION_FECHAS_ANUNCIOS_ERROR:
      return {
        ...state,
        fechasAnuncios: {},
      };
    case types.GET_LISTADO_ANUNCIOS_IDS:
      return {
        ...state,
      };
    case types.GET_LISTADO_ANUNCIOS_IDS_SUCCESS:
      return {
        ...state,
        listadosAnunciosIds: action.resultados,
      };
    case types.GET_LISTADO_ANUNCIOS_IDS_ERROR:
      return {
        ...state,
        listadosAnunciosIds: [],
      };
    default:
      return { ...state };
  }
}
