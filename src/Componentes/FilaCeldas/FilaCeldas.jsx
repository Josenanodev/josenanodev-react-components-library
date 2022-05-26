import React, { useState, useEffect } from "react";
import "./FilaCeldas.css";

//Componentes
import Celda from "../Celda/Celda";

//Variables
const milisegundosDeUnDia = 86400000; //No modificar

/**
 * @param {{
 * IdFila: String,
 * fechaMinima: Date,
 * ancho: Number,
 * alto: Number,
 * anchoPaginacion: Number,
 * anchoDeCeldas: Number,
 * altoDeCeldas: Number,
 * desfase: Number
 * }}
 */

const FilaCeldas = ({
  IdFila,
  fechaMinima,
  ancho,
  alto,
  anchoPaginacion,
  anchoDeCeldas,
  altoDeCeldas,
  desfase,
}) => {
  const [fechas, setFechas] = useState([]);
  useEffect(() => {
    let array = [...fechas];
    const fechaMinimaMilisegundos =
      Date.parse(fechaMinima) + milisegundosDeUnDia * desfase;
    for (
      let index = 0;
      index < anchoPaginacion;
      index++
    ) {
      array[index] = new Date(
        fechaMinimaMilisegundos + milisegundosDeUnDia * (index + 1)
      );
    }
    setFechas(array);
  }, [fechaMinima, anchoPaginacion, desfase]);

  return (
    <div
      className="fila-de-celdas"
      style={{
        width: ancho,
        height: alto,
      }}
    >
      {fechas.length > 0 &&
        fechas.map((fecha, index) => (
          <Celda
            key={index}
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
};

export default FilaCeldas;
