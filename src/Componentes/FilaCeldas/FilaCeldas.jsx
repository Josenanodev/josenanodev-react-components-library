import React from "react";
import "./FilaCeldas.css";

//Componentes
import Celda from "../Celda/Celda";

/**
 * @param {{
 * indexFila: Number,
 * IdFila: String,
 * fechasVisibles: Array,
 * fechaMinima: Date,
 * ancho: Number,
 * alto: Number,
 * anchoPaginacion: Number,
 * anchoDeCeldas: Number,
 * altoDeCeldas: Number,
 * desfaseY: Number,
 * desfaseX: Number
 * }}
 */

const FilaCeldas = React.memo(
  ({
    indexFila,
    IdFila,
    fechasVisibles,
    ancho,
    alto,
    anchoPaginacion,
    anchoDeCeldas,
    altoDeCeldas,
    desfaseY,
    desfaseX,
  }) => {
    //Render
    return (
      <div
        className="fila-de-celdas"
        style={{
          width: ancho,
          height: alto,
        }}
      >
        {fechasVisibles.length > 0 &&
          fechasVisibles.map((fecha, index) => (
            <Celda
              key={fecha}
              indexCelda={index}
              indexFila={indexFila}
              style={{
                width: anchoPaginacion * anchoDeCeldas,
                height: altoDeCeldas,
              }}
              idFila={IdFila}
              fecha={fecha}
              ancho={anchoDeCeldas}
              alto={altoDeCeldas}
              posicionX={index}
              desfaseY={desfaseY}
              desfaseX={desfaseX}
            />
          ))}
      </div>
    );
  }
);

export default FilaCeldas;
