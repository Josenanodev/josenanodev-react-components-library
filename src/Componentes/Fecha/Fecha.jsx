import React from "react";
import "./Fecha.css";

/**
 * @param {{
 * fecha: Date,
 * idFila: String
 * ancho: Number,
 * alto: Number,
 * posicion: Number,
 * desfase: Number,
 * }}
 */

const Fecha = ({ fecha, idFila, ancho = "auto", alto = "auto", posicion, desfase }) => {
  const abreviacionesDiaDeSemana = ["do", "lu", "ma", "mi", "ju", "vi", "sá"];
  return (
    <div
      fecha={fecha}
      fila={idFila}
      className="fecha"
      style={{
        width: ancho,
        height: alto,
        left: ancho * posicion + desfase * ancho,
      }}
    >
      <div>
        <p>{abreviacionesDiaDeSemana[fecha.getDay()]}</p>
        <p>{fecha.getDate()}</p>
      </div>
    </div>
  );
};

export default Fecha;
