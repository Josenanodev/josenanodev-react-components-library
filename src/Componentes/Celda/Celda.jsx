import React, { useEffect, useState } from "react";
import "./Celda.css";

//Redux
import { useSelector, useDispatch } from "react-redux";
import * as FechasAnunciosSelectors from "../../redux/Selectors/FechasAnunciosSelector";
import {
  setReservacionEnfocada,
  reiniciarReservacionEnfocada,
  setRangoFechasAnunciosSeleccionado,
  reiniciarRangoFechasAnunciosSeleccionado,
} from "../../redux/Actions/FechasAnunciosActions";

//Utils
import jsToSqlDate from "../../utils/jsToSqlDate";
import arrayDeFechas from "../../utils/arrayDeFechas";

//Variables
const milisegundosDeUnDia = 86400000; //No modificar

/**
 * @param {{
 * fecha: Date,
 * indexCelda: Number,
 * indexFila: Number,
 * idFila: String
 * ancho: Number,
 * alto: Number,
 * posicionX: Number,
 * desfaseY: Number,
 * desfaseX: Number,
 * }}
 */

const Celda = React.memo(
  ({
    fecha,
    indexCelda,
    indexFila,
    idFila,
    ancho = "auto",
    alto = "auto",
    posicionX,
    desfaseY,
    desfaseX,
  }) => {
    //Redux
    const dispatch = useDispatch();
    const fechasAnuncios = useSelector((state) =>
      FechasAnunciosSelectors.fechasAnuncios(state)
    );
    const rangoFechaAnunciosSeleccionado = useSelector((state) =>
      FechasAnunciosSelectors.rangoFechaAnunciosSeleccionado(state)
    );
    //Estados
    const [bloqueada, setBloqueada] = useState(false);
    const [precio, setPrecio] = useState(undefined);
    const [reservacion, setReservacion] = useState(false);
    //Funciones
    const igualdadDeDia = (dia1, dia2) => {
      return (
        dia1.getDate() === dia2.getDate() &&
        dia1.getMonth() === dia2.getMonth() &&
        dia1.getFullYear() === dia2.getFullYear()
      );
    };
    const verificarExistencia = () => {
      return (
        fechasAnuncios &&
        fechasAnuncios[idFila] &&
        fechasAnuncios[idFila][jsToSqlDate(fecha)]
      );
    };
    const definicionClaseCelda = () => {
      let clase = "contenido-celda";
      if (
        !fechasAnuncios ||
        !fechasAnuncios[idFila] ||
        !fechasAnuncios[idFila][jsToSqlDate(fecha)]
      ) {
        clase = clase.concat(" fecha-sin-info");
        return clase;
      }
      if (Date.parse(fecha) < Date.now() - milisegundosDeUnDia)
        clase = clase.concat(" fecha-pasada");
      if (igualdadDeDia(fecha, new Date())) clase = clase.concat(" fecha-hoy");
      if (bloqueada) clase = clase.concat(" fecha-bloqueada");
      if (reservacion) clase = clase.concat(" fecha-reservacion");
      return clase;
    };
    //UseEffect
    useEffect(() => {
      if (fechasAnuncios &&
        fechasAnuncios[idFila] &&
        fechasAnuncios[idFila][jsToSqlDate(fecha)]) {
        setBloqueada(fechasAnuncios[idFila][jsToSqlDate(fecha)].bloqueo);
        setPrecio(fechasAnuncios[idFila][jsToSqlDate(fecha)].precio);
        setReservacion(fechasAnuncios[idFila][jsToSqlDate(fecha)].reservacion);
      }
    }, [fechasAnuncios, idFila, fecha]);

    return (
      <div
        className="celda"
        style={{
          width: ancho,
          height: alto,
          left: ancho * posicionX + desfaseX * ancho,
        }}
      >
        <div
          className={definicionClaseCelda()}
          onClick={() => {
            dispatch(reiniciarReservacionEnfocada());
            dispatch(
              setRangoFechasAnunciosSeleccionado(
                (!rangoFechaAnunciosSeleccionado.seleccion1.fecha &&
                  !rangoFechaAnunciosSeleccionado.seleccion1.anuncio) ||
                  (rangoFechaAnunciosSeleccionado.seleccion2.fecha &&
                    rangoFechaAnunciosSeleccionado.seleccion2.anuncio)
                  ? {
                      seleccion1: {
                        fecha: fecha,
                        anuncio: idFila,
                        posicionX: (posicionX + desfaseX) * ancho,
                        posicionY: (indexFila + desfaseY) * alto,
                      },
                      seleccion2: { fecha: undefined, anuncio: undefined },
                    }
                  : {
                      seleccion1: rangoFechaAnunciosSeleccionado.seleccion1,
                      seleccion2: {
                        fecha: fecha,
                        anuncio: idFila,
                        posicionX: (posicionX + desfaseX) * ancho,
                        posicionY: (indexFila + desfaseY) * alto,
                      },
                    }
              )
            );
          }}
        >
          {!bloqueada && !reservacion && (
            <p className="precio-fecha">{precio && precio + " €"}</p>
          )}
        </div>
        {verificarExistencia() &&
          reservacion &&
          (indexCelda === 0 || igualdadDeDia(fecha, reservacion.llegada)) && (
            <div
              id={String(idFila).concat("fecha")}
              className="reservacion"
              style={{
                width:
                  (arrayDeFechas(
                    Date.parse(fecha) > Date.parse(reservacion.llegada)
                      ? fecha
                      : reservacion.llegada,
                    reservacion.salida
                  ).length -
                    1) *
                  ancho,
              }}
              onClick={() => {
                dispatch(reiniciarRangoFechasAnunciosSeleccionado());
                dispatch(setReservacionEnfocada(reservacion));
              }}
            >
              <p>
                {reservacion.cliente} {reservacion.costo} €
              </p>
              {arrayDeFechas(reservacion.llegada, reservacion.salida).length -
                1 >=
                3 && <p>{reservacion.estatus}</p>}
            </div>
          )}
      </div>
    );
  }
);

export default Celda;
