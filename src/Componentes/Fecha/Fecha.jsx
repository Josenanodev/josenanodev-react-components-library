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

//Variables
const abreviacionesDiaDeSemana = ["do", "lu", "ma", "mi", "ju", "vi", "sá"];
const nombresDeMeses = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const Fecha = ({
  fecha,
  idFila,
  ancho = "auto",
  alto = "auto",
  posicion,
  desfase,
}) => {
  //Render
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
      <div
        className={
          fecha.getDate() === new Date().getDate() &&
          fecha.getMonth() === new Date().getMonth() &&
          fecha.getFullYear() === new Date().getFullYear()
            ? "div-fecha-hoy"
            : "div-fecha"
        }
      >
        <div>
          <p>{abreviacionesDiaDeSemana[fecha.getDay()]}</p>
          <p>{fecha.getDate()}</p>
        </div>
      </div>
      {fecha.getDate() === 1 && (
        <div className="inicio-mes">
          <p className="texto-inicio-mes">
            {nombresDeMeses[fecha.getMonth()]} {fecha.getFullYear()}
          </p>
        </div>
      )}
    </div>
  );
};

export default Fecha;
