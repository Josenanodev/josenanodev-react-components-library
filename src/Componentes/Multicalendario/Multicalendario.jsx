import React, { Fragment, useEffect, useState, useRef } from "react";
import "./Multicalendario.css";

//Assets
import * as BootstrapIcons from "react-icons/bs";

//Componentes
import FilaFechas from "../FilaFechas/FilaFechas";
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
  const [paginacionDerecha, setPaginacionDerecha] = useState(
    Math.ceil(factorSobredimension / 2)
  );
  const [paginacionIzquierda, setPaginacionIzquierda] = useState(
    Math.ceil(factorSobredimension / 2)
  );
  // const [paginacion, setPaginacion] = useState(-1);
  const [anchoPaginacion, setAnchoPaginacion] = useState();
  const [posicionX, setPosicionX] = useState(0);
  useEffect(() => {
    contenedorRef.current.scrollLeft =
      (paginacionIzquierda - 3) * anchoDeCeldas;
    setPosicionX(contenedorRef.current.scrollLeft);
    // document.getElementById("div-fila-fechas").onscroll(function(e)  {
    //   e.target.scroll
    // })
  }, []);

  useEffect(() => {
    setAnchoPaginacion(Math.ceil(width / anchoDeCeldas));
    if (contenedorRef.current.scrollLeft) {
      contenedorRef.current.scrollLeft =
        (paginacionIzquierda - 3) * anchoDeCeldas;
      setPosicionX(contenedorRef.current.scrollLeft);
    }
  }, [width, height, contenedorRef]);

  // const pobladorFilaFechas = () => {
  //   let fechas = [];
  //   const fechaMinimaMilisegundos =
  //     Date.parse(fechaHoy) -
  //     milisegundosDeUnDia * paginacionIzquierda +
  //     milisegundosDeUnDia * Math.floor(posicionX / anchoDeCeldas);
  //   for (let index = 0; index < anchoPaginacion; index++) {
  //     fechas[index] = new Date(
  //       fechaMinimaMilisegundos + milisegundosDeUnDia * (index + 1)
  //     );
  //   }
  //   return (
  //     <Fragment>
  //       {fechas.map((fecha, index) => (
  //         <Fecha
  //           key={index}
  //           fecha={fecha}
  //           ancho={anchoDeCeldas}
  //           alto={altoDeCeldas}
  //           posicion={index}
  //           desfase={Math.floor(posicionX / anchoDeCeldas)}
  //         />
  //       ))}
  //     </Fragment>
  //   );
  // };
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
          {/* <div
            id="div-fila-fechas"
            style={{
              width: (paginacionIzquierda + paginacionDerecha) * anchoDeCeldas,
              height: altoDeCeldas,
            }}
          >
            {pobladorFilaFechas()}
          </div> */}
            <FilaFechas
              IdFila="eje-de-fechas"
              fechaMinima={
                new Date(Date.parse(fechaHoy) - milisegundosDeUnDia * paginacionIzquierda)
              }
              ancho={(paginacionIzquierda + paginacionDerecha) * anchoDeCeldas}
              alto={altoDeCeldas}
              anchoPaginacion={anchoPaginacion}
              anchoDeCeldas={anchoDeCeldas}
              altoDeCeldas={altoDeCeldas}
              desfase={Math.floor(posicionX / anchoDeCeldas)}
            />
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
            (paginacionIzquierda + paginacionDerecha) * anchoDeCeldas -
              anchoDeCeldas
          ) {
            setPaginacionDerecha(paginacionDerecha + 1);
          }
          if (e.target.scrollLeft < anchoDeCeldas) {
            setPaginacionIzquierda(paginacionIzquierda + 1);
            e.target.scrollLeft = anchoDeCeldas * 3;
          }
          // listaAnunciosRef.current.scrollTop = e.target.scrollTop;
        }}
      >
        <div
          id="div-contendor-celdas"
          style={{
            width: (paginacionIzquierda + paginacionDerecha) * anchoDeCeldas,
          }}
          className="div-ancho-dinamico"
        >
          {/* {pobladorFilaFechas()} */}
        </div>
      </div>
    </div>
  );
};

export default Multicalendario;
