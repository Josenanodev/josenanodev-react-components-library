import React, { useState, useEffect } from "react";
import "./VisualizadorInformacion.css";

//Redux
import { useSelector, useDispatch } from "react-redux";
import {
  reiniciarReservacionEnfocada,
  reiniciarRangoFechasAnunciosSeleccionado,
} from "../../redux/Actions/FechasAnunciosActions";
import * as FechasAnunciosSelectors from "../../redux/Selectors/FechasAnunciosSelector";

//iconos
import { BsChevronRight, BsX } from "react-icons/bs";

//Componentes
import Reservacion from "../Reservacion/Reservacion";
import EditorFechas from "../EditorFechas/EditorFechas";

const VisualizadorInformacion = () => {
  //Redux
  const dispatch = useDispatch();
  const reservacionEnfocada = useSelector((state) =>
    FechasAnunciosSelectors.reservacionEnfocada(state)
  );
  const rangoFechaAnunciosSeleccionado = useSelector((state) =>
    FechasAnunciosSelectors.rangoFechaAnunciosSeleccionado(state)
  );
  //Estados
  const [abierto, setAbierto] = useState(false);
  const [mostrarX, setMostrarX] = useState(false);
  //UseEffect
  useEffect(() => {
    let editor =
      rangoFechaAnunciosSeleccionado.seleccion1.fecha &&
      rangoFechaAnunciosSeleccionado.seleccion2.fecha &&
      rangoFechaAnunciosSeleccionado.seleccion1.anuncio &&
      rangoFechaAnunciosSeleccionado.seleccion2.anuncio;
    if (reservacionEnfocada || editor) {
      setAbierto(true);
      setMostrarX(true);
    }
    if (!reservacionEnfocada && !editor) {
      setAbierto(false);
      setMostrarX(false);
    }
    if (reservacionEnfocada && editor) {
      setAbierto(false);
      setMostrarX(false);
    }
  }, [reservacionEnfocada, rangoFechaAnunciosSeleccionado]);

  return (
    <div
      className={
        abierto
          ? "visualizador-informacion visualizador-informacion-abierto"
          : "visualizador-informacion visualizador-informacion-cerrado"
      }
    >
      {mostrarX ? (
        <div className="div-visualizador-boton">
          <BsX
            className={
              abierto
                ? "boton-abrir-visualizador-informacion boton-abrir-visualizador-informacion-abierto"
                : "boton-abrir-visualizador-informacion boton-abrir-visualizador-informacion-cerrado"
            }
            onClick={() => {
              dispatch(reiniciarReservacionEnfocada());
              dispatch(reiniciarRangoFechasAnunciosSeleccionado());
              setAbierto(!abierto);
              setMostrarX(false);
            }}
          />
        </div>
      ) : (
        <div className="div-visualizador-boton">
          <BsChevronRight
            className={
              abierto
                ? "boton-abrir-visualizador-informacion boton-abrir-visualizador-informacion-abierto"
                : "boton-abrir-visualizador-informacion boton-abrir-visualizador-informacion-cerrado"
            }
            onClick={() => setAbierto(!abierto)}
          />
        </div>
      )}
      <Reservacion />
      <EditorFechas />
    </div>
  );
};

export default VisualizadorInformacion;
