import React, { Fragment, useEffect, useState, useRef } from "react";
import "./Multicalendario.css";

//Assets
import * as BootstrapIcons from "react-icons/bs";

//Componentes
// import FilaFechas from "../FilaFechas/FilaFechas";
import Fecha from "../Fecha/Fecha";

//Hooks
import useWindowSize from "../../Hooks/useWindowsSize";

//Variables
const milisegundosDeUnDia = 86400000; //No modificar
const anchoDeCeldas = 80;
const altoDeCeldas = 48;
const factorSobredimension = 60;
const anchoListaAnuncios = 280;
// const rangoPaginacionSuperior = 30;
// const rangoPaginacionInferior = 30;
const fechaHoy = new Date();

const Multicalendario = () => {
  const filaFechasRef = useRef();
  const listaAnunciosRef = useRef();
  const contenedorRef = useRef();
  const [width, height] = useWindowSize();
  // const [paginacionDerecha, setPaginacionDerecha] = useState(30);
  // const [paginacionIzquierda, setPaginacionIzquierda] = useState(30);
  const [paginacion, setPaginacion] = useState(-1);
  const [anchoPaginacion, setAnchoPaginacion] = useState(factorSobredimension);
  const [posicionX, setPosicionX] = useState(0);
  useEffect(() => {
    contenedorRef.current.scrollLeft =
      ((Math.ceil(width / anchoDeCeldas) + factorSobredimension) / 2) *
      anchoDeCeldas;
    setPosicionX(contenedorRef.current.scrollLeft);
    // document.getElementById("div-fila-fechas").onscroll(function(e)  {
    //   e.target.scroll
    // })
  }, []);

  useEffect(() => {
    setAnchoPaginacion(Math.ceil(width / anchoDeCeldas) + factorSobredimension);
    if (contenedorRef.current.scrollLeft) {
      contenedorRef.current.scrollLeft =
        ((Math.ceil(width / anchoDeCeldas) + factorSobredimension) / 2) *
        anchoDeCeldas;
      setPosicionX(contenedorRef.current.scrollLeft);
    }
  }, [width, height, contenedorRef]);

  const pobladorFilaFechas = () => {
    let fechas = [];
    const fechaMinimaMilisegundos =
      Date.parse(fechaHoy) +
      milisegundosDeUnDia *
        ((paginacion * anchoPaginacion - factorSobredimension) / 2);
    for (
      let index = 0;
      index < anchoPaginacion - factorSobredimension;
      index++
    ) {
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
            posicion={index}
            desfase={Math.floor(posicionX / anchoDeCeldas)}
          />
        ))}
      </Fragment>
    );
  };
  return (
    <div
      className="multicalendario"
      style={{
        "grid-template-columns": `${anchoListaAnuncios}px calc(100% - ${anchoListaAnuncios}px)`,
      }}
    >
      <div className="filtros"></div>
      <div className="eje-vertical"></div>
      <div className="eje-horizontal">
        <div className="div-botones-fechas">
          <button
            className="boton-semana-pasada"
            onClick={() =>
              filaFechasRef.current.scroll({
                left: filaFechasRef.current.scrollLeft - anchoDeCeldas * 7,
              })
            }
          >
            <BootstrapIcons.BsChevronLeft />
          </button>
          <button
            onClick={() =>
              filaFechasRef.current.scroll({
                left: filaFechasRef.current.scrollLeft + anchoDeCeldas * 7,
              })
            }
            className="boton-semana-siguiente"
          >
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
              width: anchoPaginacion * anchoDeCeldas,
              height: altoDeCeldas,
            }}
            className="div-ancho-dinamico"
          >
            {pobladorFilaFechas()}
          </div>
          {/* <FilaFechas
            IdFila="eje-de-fechas"
            paginacion={paginacion}
            anchoPaginacion={anchoPaginacion}
            factorSobredimension={factorSobredimension}
            anchoDeCeldas={anchoDeCeldas}
            altoDeCeldas={altoDeCeldas}
            desfase={Math.floor(posicionX / anchoDeCeldas)}
          /> */}
        </div>
      </div>
      <div
        ref={contenedorRef}
        className="contendor-principal"
        onScroll={(e) => {
          filaFechasRef.current.scrollLeft = e.target.scrollLeft;
          setPosicionX(e.target.scrollLeft);
          if (
            e.target.scrollLeft + e.target.offsetWidth >
            anchoPaginacion * anchoDeCeldas - 100
          ) {
            // setPaginacionDerecha(paginacionDerecha + 30);
            setPaginacion(paginacion + 1);
            e.target.scrollLeft = (anchoPaginacion / 2) * anchoDeCeldas;
          }
          if (e.target.scrollLeft < 100) {
            // setPaginacionIzquierda(paginacionIzquierda + 30);
            setPaginacion(paginacion - 1);
            e.target.scrollLeft = (anchoPaginacion / 2) * anchoDeCeldas;
          }
          // listaAnunciosRef.current.scrollTop = e.target.scrollTop;
        }}
      >
        <div
          id="div-contendor-celdas"
          style={{
            width: anchoPaginacion * anchoDeCeldas,
          }}
          className="div-ancho-dinamico"
        ></div>
      </div>
    </div>
  );
};

export default Multicalendario;
