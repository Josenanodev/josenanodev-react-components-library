import React, { useEffect, useState, useRef } from "react";
import "./Multicalendario.css";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getInformacionFechasAnuncios,
  getListadosAnunciosIds,
} from "../../redux/Actions/FechasAnunciosActions";
import * as FechasAnunciosSelector from "../../redux/Selectors/FechasAnunciosSelector";

//Assets
import * as BootstrapIcons from "react-icons/bs";

//Componentes
import Anuncio from "../Anuncio/Anuncio";
import FilaFechas from "../FilaFechas/FilaFechas";
import FilaCeldas from "../FilaCeldas/FilaCeldas";
import SeleccionCeldas from "../SeleccionCeldas/SeleccionCeldas";
import VisualizadorInformacion from "../VisualizadorInformacion/VisualizadorInformacion";

//Hooks
import useWindowSize from "../../Hooks/useWindowsSize";

//Variables
const milisegundosDeUnDia = 86400000; //No modificar
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
const anchoDeCeldas = 80;
const altoDeCeldas = 48;
const factorSobredimension = 1000;
const fechaHoy = new Date();
const tiempoEsperaSolicitarInfoFechas = 200;
const chunkRenderX = 2;
const chunkRenderY = 0;
const origen = { x: Math.ceil(factorSobredimension / 2) * anchoDeCeldas, y: 0 };
const desfaseFechaIncial = 2 + chunkRenderX;

const Multicalendario = () => {
  //Redux
  const dispatch = useDispatch();
  const listadoIds = useSelector((state) =>
    FechasAnunciosSelector.listadosAnunciosIds(state)
  );
  //Refs
  const filaFechasRef = useRef();
  const listaAnunciosRef = useRef();
  const contenedorRef = useRef();
  //Estados
  const [width, height] = useWindowSize();
  const [paginacionDerecha, setPaginacionDerecha] = useState(
    Math.ceil(factorSobredimension / 2)
  );
  const [paginacionIzquierda, setPaginacionIzquierda] = useState(
    Math.ceil(factorSobredimension / 2)
  );
  const [anchoPaginacion, setAnchoPaginacion] = useState();
  const [altoPaginacion, setAltoPaginacion] = useState();
  const [desfaseX, setDesfaseX] = useState(1);
  const [desfaseY, setDesfaseY] = useState(0);
  const [fechasVisibles, setFechasVisibles] = useState([]);
  const [listadoVisible, setlistadoVisible] = useState([]);
  const [posicionX, setPosicionX] = useState(origen.x);
  const [posicionY, setPosicionY] = useState(origen.y);
  const [coordenadasRender, setCoordenadasRender] = useState({
    x: origen.x,
    y: origen.y,
  });
  const [timeoutGetFechasAnuncios, setTimeoutGetFechasAnuncios] = useState({
    _id: undefined,
    x: 0,
    y: 0,
  });
  const [arrayMeses, setArrayMeses] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState(undefined);
  //Funciones
  const cambiaScrollContendorSegunFecha = (fecha) => {
    //nueva posicion de scroll horizontal = cantidad de dias hasta hoy * ancho de celda
    contenedorRef.current.scrollLeft =
      ((Date.parse(fecha) -
        (Date.parse(fechaHoy) - paginacionIzquierda * milisegundosDeUnDia)) /
        milisegundosDeUnDia) *
      anchoDeCeldas;
  };
  //UseEffects
  useEffect(() => {
    // Posicionamiento inicial en X
    contenedorRef.current.scrollLeft = origen.x;
    dispatch(getListadosAnunciosIds());
  }, [dispatch]);
  useEffect(() => {
    // Dimensiones de paginacion
    setAnchoPaginacion(Math.ceil(width / anchoDeCeldas));
    setAltoPaginacion(Math.floor(height / altoDeCeldas));
    // Redefinicion de posicion X ante cambios en el tamaño de la ventana
    if (contenedorRef.current.scrollLeft) {
      setPosicionX(contenedorRef.current.scrollLeft);
      setCoordenadasRender({
        x: contenedorRef.current.scrollLeft,
        y: contenedorRef.current.scrollTop,
      });
      setDesfaseX(
        Math.floor(contenedorRef.current.scrollLeft / anchoDeCeldas) -
          chunkRenderX
      );
    }
  }, [width, height, contenedorRef]);
  useEffect(() => {
    // Definicion de visibilidad y renderizacion del Eje Y
    if (
      (coordenadasRender.x === origen.x && coordenadasRender.y === origen.y) ||
      Math.abs(coordenadasRender.y - posicionY) / altoDeCeldas > chunkRenderY
    ) {
      if (
        !(coordenadasRender.x === origen.x && coordenadasRender.y === origen.y)
      ) {
        setCoordenadasRender({
          x: contenedorRef.current.scrollLeft,
          y: contenedorRef.current.scrollTop,
        });
      }
      let array = [];
      let arrayFiltrado = [...listadoIds];
      let desfase = Math.floor(posicionY / altoDeCeldas) - chunkRenderY;
      let sinDesfase = false;
      //Filtrado de busqueda
      if (terminoBusqueda) {
        arrayFiltrado = arrayFiltrado.filter(
          (_id) => terminoBusqueda === String(_id).toLowerCase()
        );
      }
      for (let index = 0; index < altoPaginacion + chunkRenderY * 2; index++) {
        if (arrayFiltrado[index + desfase] && index + desfase >= 0)
          array[index] = arrayFiltrado[index + desfase];
        if (posicionY === 0 || index + desfase === 0) sinDesfase = true;
      }
      setDesfaseY(sinDesfase ? 0 : desfase);
      setlistadoVisible(array);
    }
  }, [
    posicionY,
    altoPaginacion,
    terminoBusqueda,
    coordenadasRender,
    listadoIds,
  ]);
  useEffect(() => {
    // Definicion de visibilidad y renderizacion del Eje X
    if (
      (coordenadasRender.x === origen.x && coordenadasRender.y === origen.y) ||
      posicionX < anchoDeCeldas ||
      Math.abs(coordenadasRender.x - posicionX) / anchoDeCeldas > chunkRenderX
    ) {
      if (
        !(coordenadasRender.x === origen.x && coordenadasRender.y === origen.y)
      ) {
        setCoordenadasRender({
          x: contenedorRef.current.scrollLeft,
          y: contenedorRef.current.scrollTop,
        });
      }
      setDesfaseX(Math.floor(posicionX / anchoDeCeldas) - chunkRenderX);
      let fechaMinima = new Date(
        Date.parse(fechaHoy) +
          milisegundosDeUnDia *
            (Math.floor(posicionX / anchoDeCeldas) -
              paginacionIzquierda -
              desfaseFechaIncial)
      );
      fechaMinima.setHours(0, 0, 0, 0);
      const fechaMinimaMilisegundos = Date.parse(fechaMinima);
      let array = [];
      for (let index = 0; index < anchoPaginacion + chunkRenderX * 2; index++) {
        array[index] = new Date(
          fechaMinimaMilisegundos + milisegundosDeUnDia * (index + 1)
        );
      }
      setFechasVisibles(array);
    }
  }, [anchoPaginacion, posicionX, paginacionIzquierda, coordenadasRender]);
  useEffect(() => {
    // Espera para solicitar nueva informacion de celdas y alamacena id de timeout
    if (
      listadoVisible.length > 0 &&
      fechasVisibles.length > 0 &&
      !timeoutGetFechasAnuncios._id
    ) {
      let _id = setTimeout(() => {
        dispatch(
          getInformacionFechasAnuncios({
            listaAnuncios: listadoVisible,
            fechaInicio: fechasVisibles[0],
            fechaFin: fechasVisibles[fechasVisibles.length - 1],
          })
        );
      }, tiempoEsperaSolicitarInfoFechas);
      setTimeoutGetFechasAnuncios({ _id: _id, x: posicionX, y: posicionY });
    }
  }, [
    listadoVisible,
    fechasVisibles,
    timeoutGetFechasAnuncios,
    dispatch,
    posicionX,
    posicionY,
  ]);
  useEffect(() => {
    // Cancelacion de timeouts para evitar grandes cantidades de solicitudes mientras se hace scroll
    if (
      timeoutGetFechasAnuncios._id &&
      (timeoutGetFechasAnuncios.x !== posicionX ||
        timeoutGetFechasAnuncios.y !== posicionY)
    ) {
      clearTimeout(timeoutGetFechasAnuncios._id);
      setTimeoutGetFechasAnuncios({
        _id: undefined,
        x: timeoutGetFechasAnuncios.x,
        y: timeoutGetFechasAnuncios.y,
      });
    }
  }, [posicionX, posicionY, timeoutGetFechasAnuncios]);
  useEffect(() => {
    //Redefinicion de arrayMeses
    let fechaExtremaMinimaMilisegundos =
      Date.parse(fechaHoy) - paginacionIzquierda * milisegundosDeUnDia;
    let fechaExtremaMaximaMilisegundos =
      Date.parse(fechaHoy) + paginacionIzquierda * milisegundosDeUnDia;
    let array = [];
    let arrayParalelo = [];
    for (
      let index = 0;
      index * milisegundosDeUnDia + fechaExtremaMinimaMilisegundos <
      fechaExtremaMaximaMilisegundos;
      index++
    ) {
      let fecha = new Date(
        milisegundosDeUnDia * index + fechaExtremaMinimaMilisegundos
      );
      let primerDiaDelMes = fecha;
      primerDiaDelMes.setDate(1);
      primerDiaDelMes.setHours(0, 0, 0, 0);
      let stringFechaMesAnio =
        String(nombresDeMeses[fecha.getMonth()]) +
        " de " +
        String(fecha.getFullYear());
      if (!arrayParalelo.includes(stringFechaMesAnio)) {
        arrayParalelo.push(stringFechaMesAnio);
        array.push(
          <option
            key={Date.parse(primerDiaDelMes)}
            value={Date.parse(primerDiaDelMes)}
          >
            {stringFechaMesAnio}
          </option>
        );
      }
    }
    setArrayMeses(array);
  }, [paginacionIzquierda, paginacionDerecha]);
  //Render
  return (
    <div className="multicalendario">
      <div className="filtros">
        {listadoIds.length > 0 && (
          <p className="cantidad-anuncios">
            {listadoIds.length} anuncio{listadoIds.length > 0 ? "s" : ""}
          </p>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setTerminoBusqueda(
              String(e.target.elements["busqueda"].value).toLowerCase()
            );
          }}
        >
          <div className="div-buscador-anuncios">
            <div>
              <BootstrapIcons.BsSearch />
            </div>
            <input
              name="busqueda"
              type="text"
              placeholder="Buscar anuncios..."
              onChange={(e) => {
                if (!e.target.value) setTerminoBusqueda(undefined);
              }}
            />
            <div>
              <BootstrapIcons.BsSliders />
            </div>
          </div>
        </form>
      </div>
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
              paddingTop: desfaseY * altoDeCeldas,
            }}
          >
            {listadoVisible.map((_id) => (
              <Anuncio key={_id} idAnuncio={_id} alto={altoDeCeldas} />
            ))}
          </div>
        </div>
      </div>
      <div className="eje-horizontal">
        <div className="div-dropdown-fechas-boton-hoy">
          <select
            value={Date.parse(
              new Date(
                new Date(
                  (posicionX / anchoDeCeldas) * milisegundosDeUnDia +
                    (Date.parse(fechaHoy) -
                      paginacionIzquierda * milisegundosDeUnDia)
                ).getFullYear(),
                new Date(
                  (posicionX / anchoDeCeldas) * milisegundosDeUnDia +
                    (Date.parse(fechaHoy) -
                      paginacionIzquierda * milisegundosDeUnDia)
                ).getMonth(),
                1,
                0,
                0,
                0,
                0
              )
            )}
            onChange={(e) =>
              cambiaScrollContendorSegunFecha(new Date(Number(e.target.value)))
            }
          >
            {arrayMeses}
          </select>
          <button onClick={() => cambiaScrollContendorSegunFecha(fechaHoy)}>
            Hoy
          </button>
        </div>
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
          className="div-fila-fechas"
          onScroll={(e) =>
            (contenedorRef.current.scrollLeft = e.target.scrollLeft)
          }
        >
          <FilaFechas
            IdFila="eje-de-fechas"
            fechasVisibles={fechasVisibles}
            ancho={(paginacionIzquierda + paginacionDerecha) * anchoDeCeldas}
            alto={87}
            anchoPaginacion={anchoPaginacion}
            anchoDeCeldas={anchoDeCeldas}
            altoDeCeldas={87}
            desfase={desfaseX}
          />
        </div>
      </div>
      <div className="div-contenedor-principal">
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
                paddingTop: desfaseY * altoDeCeldas,
              }}
            >
              {listadoVisible.map((_id, index) => (
                <FilaCeldas
                  key={_id}
                  indexFila={index}
                  IdFila={_id}
                  fechasVisibles={fechasVisibles}
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
                  desfaseY={desfaseY}
                  desfaseX={desfaseX}
                />
              ))}
              <SeleccionCeldas
                altoMinimo={altoDeCeldas}
                anchoMinimo={anchoDeCeldas}
              />
            </div>
          </div>
        </div>
        <VisualizadorInformacion />
      </div>
    </div>
  );
};

export default Multicalendario;
