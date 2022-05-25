import React, { Fragment, useEffect, useState, useRef } from "react";
import "./Multicalendario.css";

//Assets
import * as BootstrapIcons from "react-icons/bs";

//Componentes
import Fecha from "../Fecha/Fecha";

//Variables
const milisegundosDeUnDia = 86400000; //No modificar
const anchoDeCeldas = 80;
const altoDeCeldas = 48;
const rangoPaginacionSuperior = 30;
const rangoPaginacionInferior = 30;
const fechaHoy = new Date();

const Multicalendario = () => {
  const filaFechasRef = useRef();
  const listaAnunciosRef = useRef();
  const contenedorRef = useRef();
  const [paginacionDerecha, setPaginacionDerecha] = useState(30);
  const [paginacionIzquierda, setPaginacionIzquierda] = useState(30);
  const [paginacion, setPaginacion] = useState(60);
  useEffect(() => {
    // document.getElementById("div-fila-fechas").onscroll(function(e)  {
    //   e.target.scroll
    // })
  }, []);

  const pobladorFilaFechas = () => {
    let fechas = [];
    let longitud = paginacionDerecha + paginacionIzquierda;
    const fechaMinimaMilisegundos =
      Date.parse(fechaHoy) - milisegundosDeUnDia * paginacionIzquierda;
    for (let index = 0; index < longitud; index++) {
      fechas[index] = new Date(
        fechaMinimaMilisegundos + milisegundosDeUnDia * (index + 1)
      );
    }
    return (
      <Fragment>
        {fechas.map((fecha, index) => (
          <Fecha
            key={index}
            fecha={fecha}
            ancho={anchoDeCeldas}
            alto={altoDeCeldas}
          />
        ))}
      </Fragment>
    );
  };
  return (
    <div className="multicalendario">
      <div className="filtros"></div>
      <div className="eje-vertical"></div>
      <div className="eje-horizontal">
        <div className="div-botones-fechas">
          <button className="boton-semana-pasada">
            <BootstrapIcons.BsChevronLeft />
          </button>
          <button className="boton-semana-siguiente">
            <BootstrapIcons.BsChevronRight />
          </button>
        </div>
        <div
          ref={filaFechasRef}
          className="fila-fechas"
          onScroll={(e) =>
            (contenedorRef.current.scrollLeft = e.target.scrollLeft)
          }
        >
          <div
            id="div-fila-fechas"
            style={{
              width: (paginacionDerecha + paginacionIzquierda) * anchoDeCeldas,
            }}
            className="div-ancho-dinamico"
          >
            {pobladorFilaFechas()}
          </div>
        </div>
      </div>
      <div
        ref={contenedorRef}
        className="contendor-principal"
        onScroll={(e) => {
          console.log(
            "scroll",
            e.target.scrollTop,
            e.target.scrollLeft
          );
          filaFechasRef.current.scrollLeft = e.target.scrollLeft;
          if (
            e.target.scrollLeft + e.target.offsetWidth >
            (paginacionDerecha + paginacionIzquierda) * anchoDeCeldas - 100
          ) {
            setPaginacionDerecha(paginacionDerecha + 30);
          }
          if (e.target.scrollLeft < 100) {
            setPaginacionIzquierda(paginacionIzquierda + 30);
            e.target.scrollLeft = 200
          }
          // listaAnunciosRef.current.scrollTop = e.target.scrollTop;
        }}
      >
        <div
          id="div-contendor-celdas"
          style={{
            width: (paginacionDerecha + paginacionIzquierda) * anchoDeCeldas,
          }}
          className="div-ancho-dinamico"
        ></div>
      </div>
    </div>
  );
};

export default Multicalendario;
