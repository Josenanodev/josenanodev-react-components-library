import React, { useState } from "react";
import "./VisualizadorInformacion.css";

//iconos
import { BsChevronRight } from "react-icons/bs";

const VisualizadorInformacion = () => {
  //Estados
  const [abierto, setAbierto] = useState(false);
  return (
    <div
      className={
        abierto
          ? "visualizador-informacion visualizador-informacion-abierto"
          : "visualizador-informacion visualizador-informacion-cerrado"
      }
    >
      <BsChevronRight
        className={
          abierto
            ? "boton-abrir-visualizador-informacion boton-abrir-visualizador-informacion-abierto"
            : "boton-abrir-visualizador-informacion boton-abrir-visualizador-informacion-cerrado"
        }
        onClick={() => setAbierto(!abierto)}
      />
    </div>
  );
};

export default VisualizadorInformacion;
