import React from "react";
import "./Celda.css";

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

const Celda = ({ fecha, idFila, ancho = "auto", alto = "auto", posicion, desfase }) => {
  return (
    <div
      fecha={fecha}
      fila={idFila}
      className="celda"
      style={{
        width: ancho,
        height: alto,
        left: ancho * posicion + desfase * ancho,
      }}
    >
    </div>
  );
};

export default Celda;
