import React from "react";
import "./Fecha.css";

const Fecha = ({ fecha, ancho = "auto", alto = "auto" }) => {
  const abreviacionesDiaDeSemana = ["do", "lu", "ma", "mi", "ju", "vi", "sá"];
  return (
    <div className="fecha" style={{ width: ancho, height: alto }}>
      <div>
        <p>{abreviacionesDiaDeSemana[fecha.getDay()]}</p>
        <p>{fecha.getDate()}</p>
      </div>
    </div>
  );
};

export default Fecha;
