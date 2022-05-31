import React, { useState, useEffect } from "react";
import "./SeleccionCeldas.css";

//Redux
import { useSelector } from "react-redux";
import * as FechasAnunciosSelector from "../../redux/Selectors/FechasAnunciosSelector";

/**
 * @param {{
 * altoMinimo: Number,
 * anchoMinimo: Number,
 * }}
 */

const SeleccionCeldas = ({ altoMinimo, anchoMinimo }) => {
  //Redux
  const rangoFechaAnunciosSeleccionado = useSelector((state) =>
    FechasAnunciosSelector.rangoFechaAnunciosSeleccionado(state)
  );
  //Estados
  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [alto, setAlto] = useState(0);
  const [ancho, setAncho] = useState(0);
  //useEffects
  useEffect(() => {
    if (
      rangoFechaAnunciosSeleccionado &&
      rangoFechaAnunciosSeleccionado.seleccion1.posicionX >= 0 &&
      rangoFechaAnunciosSeleccionado.seleccion1.posicionY >= 0 &&
      rangoFechaAnunciosSeleccionado.seleccion2.posicionX >= 0 &&
      rangoFechaAnunciosSeleccionado.seleccion2.posicionY >= 0
    ) {
      setVisible(true);
      setX(
        rangoFechaAnunciosSeleccionado.seleccion1.posicionX <
          rangoFechaAnunciosSeleccionado.seleccion2.posicionX
          ? rangoFechaAnunciosSeleccionado.seleccion1.posicionX
          : rangoFechaAnunciosSeleccionado.seleccion2.posicionX
      );
      setY(
        rangoFechaAnunciosSeleccionado.seleccion1.posicionY <
          rangoFechaAnunciosSeleccionado.seleccion2.posicionY
          ? rangoFechaAnunciosSeleccionado.seleccion1.posicionY
          : rangoFechaAnunciosSeleccionado.seleccion2.posicionY
      );
      setAlto(
        altoMinimo +
          Math.abs(
            rangoFechaAnunciosSeleccionado.seleccion1.posicionY -
              rangoFechaAnunciosSeleccionado.seleccion2.posicionY
          )
      );
      setAncho(
        anchoMinimo +
          Math.abs(
            rangoFechaAnunciosSeleccionado.seleccion1.posicionX -
              rangoFechaAnunciosSeleccionado.seleccion2.posicionX
          )
      );
    } else {
      setVisible(false);
      setX(0);
      setY(0);
      setAlto(0);
      setAncho(0);
    }
  }, [rangoFechaAnunciosSeleccionado, altoMinimo, anchoMinimo]);
  return (
    <div
      className={
        visible ? "seleccion-celdas-visible" : "seleccion-cledas-oculto"
      }
      style={{ top: y, left: x, height: alto, width: ancho }}
    ></div>
  );
};

export default SeleccionCeldas;
