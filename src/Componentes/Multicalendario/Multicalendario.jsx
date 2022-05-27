import React, { Fragment, useEffect, useState, useRef } from "react";
import "./Multicalendario.css";

//Assets
import * as BootstrapIcons from "react-icons/bs";

//Componentes
import FilaFechas from "../FilaFechas/FilaFechas";
import FilaCeldas from "../FilaCeldas/FilaCeldas";

//Hooks
import useWindowSize from "../../Hooks/useWindowsSize";

//Variables
const milisegundosDeUnDia = 86400000; //No modificar
const anchoDeCeldas = 80;
const altoDeCeldas = 48;
const factorSobredimension = 60;
const anchoListaAnuncios = 280;
const fechaHoy = new Date();

//Dummy
const listadoIds = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
];

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
  const [anchoPaginacion, setAnchoPaginacion] = useState();
  const [altoPaginacion, setAltoPaginacion] = useState();
  const [listadoVisible, setlistadoVisible] = useState([]);
  const [posicionX, setPosicionX] = useState(0);
  const [posicionY, setPosicionY] = useState(0);
  useEffect(() => {
    contenedorRef.current.scrollLeft =
      (paginacionIzquierda - 3) * anchoDeCeldas;
    setPosicionX(contenedorRef.current.scrollLeft);
  }, []);

  useEffect(() => {
    setAnchoPaginacion(Math.ceil(width / anchoDeCeldas));
    setAltoPaginacion(Math.floor(height / altoDeCeldas));
    if (contenedorRef.current.scrollLeft) {
      contenedorRef.current.scrollLeft =
        (paginacionIzquierda - 3) * anchoDeCeldas;
      setPosicionX(contenedorRef.current.scrollLeft);
    }
  }, [width, height, contenedorRef]);
  useEffect(() => {
    let array = [];
    let desfase = Math.floor(posicionY / altoDeCeldas);
    for (let index = 0; index < altoPaginacion; index++) {
      if (listadoIds[index + desfase])
        array[index] = listadoIds[index + desfase];
    }
    setlistadoVisible(array);
  }, [posicionY, altoPaginacion, listadoIds]);
  return (
    <div className="multicalendario">
      <div className="filtros"></div>
      <div className="eje-vertical">
        <div
          ref={listaAnunciosRef}
          className="lista-anuncios"
          onScroll={(e) =>
            (contenedorRef.current.scrollTop = e.target.scrollTop)
          }
        >
          <div
            className="div-altura-lista-anuncios"
            style={{
              height: altoDeCeldas * listadoIds.length,
              paddingTop: Math.floor(posicionY / altoDeCeldas) * altoDeCeldas,
            }}
          >
            {listadoVisible.map((_id, index) => (
              <div
                key={index}
                className="anuncio"
                style={{
                  height: altoDeCeldas,
                }}
              >
                <p>Anuncio {_id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
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
          <FilaFechas
            IdFila="eje-de-fechas"
            fechaMinima={
              new Date(
                Date.parse(fechaHoy) - milisegundosDeUnDia * paginacionIzquierda
              )
            }
            ancho={(paginacionIzquierda + paginacionDerecha) * anchoDeCeldas}
            alto={87}
            anchoPaginacion={anchoPaginacion}
            anchoDeCeldas={anchoDeCeldas}
            altoDeCeldas={87}
            desfase={Math.floor(posicionX / anchoDeCeldas)}
          />
        </div>
      </div>
      <div
        ref={contenedorRef}
        className="contendor-principal"
        onScroll={(e) => {
          filaFechasRef.current.scrollLeft = e.target.scrollLeft;
          listaAnunciosRef.current.scrollTop = e.target.scrollTop;
          setPosicionX(e.target.scrollLeft);
          setPosicionY(e.target.scrollTop);
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
        }}
      >
        <div
          className="div-filas-celdas"
          style={{
            width: (paginacionIzquierda + paginacionDerecha) * anchoDeCeldas,
          }}
        >
          <div
            className="div-altura-filas-celdas"
            style={{
              height: altoDeCeldas * listadoIds.length,
              paddingTop: Math.floor(posicionY / altoDeCeldas) * altoDeCeldas,
            }}
          >
            {listadoVisible.map((_id, index) => (
              <FilaCeldas
                key={index}
                IdFila={_id}
                fechaMinima={
                  new Date(
                    Date.parse(fechaHoy) -
                      milisegundosDeUnDia * paginacionIzquierda
                  )
                }
                ancho={
                  (paginacionIzquierda + paginacionDerecha) * anchoDeCeldas
                }
                alto={altoDeCeldas}
                anchoPaginacion={anchoPaginacion}
                anchoDeCeldas={anchoDeCeldas}
                altoDeCeldas={altoDeCeldas}
                desfase={Math.floor(posicionX / anchoDeCeldas)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Multicalendario;
