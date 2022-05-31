import React from "react";
import "./FilaFechas.css";

//Componentes
import Fecha from "../Fecha/Fecha";


/**
 * @param {{
 * IdFila: String,
 * fechasVisibles: Array,
 * ancho: Number,
 * alto: Number,
 * anchoPaginacion: Number,
 * anchoDeCeldas: Number,
 * altoDeCeldas: Number,
 * desfase: Number
 * }}
 */

const FilaFechas = React.memo(({
  IdFila,
  fechasVisibles,
  ancho,
  alto,
  anchoPaginacion,
  anchoDeCeldas,
  altoDeCeldas,
  desfase,
}) => {
  //Render
  return (
    <div
      className="fila-de-fechas"
      style={{
        width: ancho,
        height: alto,
      }}
    >
      {fechasVisibles.length > 0 &&
        fechasVisibles.map((fecha, index) => (
          <Fecha
            key={fecha}
            style={{
              width: anchoPaginacion * anchoDeCeldas,
              height: altoDeCeldas,
            }}
            idFila={IdFila}
            fecha={fecha}
            ancho={anchoDeCeldas}
            alto={altoDeCeldas}
            posicion={index}
            desfase={desfase}
          />
        ))}
    </div>
  );
})

export default FilaFechas;
