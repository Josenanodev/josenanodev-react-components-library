import React, { Fragment } from "react";
import "./Reservacion.css";

//Redux
import { useSelector } from "react-redux";
import * as FechasAnunciosSelectors from "../../redux/Selectors/FechasAnunciosSelector";

//Utils
import arrayDeFechas from "../../utils/arrayDeFechas";

//Variables
const abreviacionesDiaDeSemana = [
  "dom",
  "lun",
  "mar",
  "mie",
  "jue",
  "vie",
  "sáb",
];
const abreviacionMeses = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

const Reservacion = () => {
  //Redux
  const reservacionEnfocada = useSelector((state) =>
    FechasAnunciosSelectors.reservacionEnfocada(state)
  );
  //Funciones
  const resumenHeaderReservacion = () => {
    if (reservacionEnfocada) {
      const fechaDeHoy = new Date();
      const diasParaLLegada =
        Date.parse(reservacionEnfocada.llegada) > Date.parse(fechaDeHoy)
          ? `Llega en ${
              arrayDeFechas(fechaDeHoy, reservacionEnfocada.llegada).length - 1
            } día${
              arrayDeFechas(fechaDeHoy, reservacionEnfocada.llegada).length -
                1 >
              1
                ? "s"
                : ""
            }`
          : Date.parse(reservacionEnfocada.salida) < Date.parse(fechaDeHoy)
          ? "Huésped anterior"
          : "Estancia en curso";
      return (
        diasParaLLegada +
        " · " +
        String(reservacionEnfocada.huespedes) +
        (reservacionEnfocada.huespedes > 1 ? " huéspedes" : " huésped") +
        " · " +
        String(
          arrayDeFechas(reservacionEnfocada.llegada, reservacionEnfocada.salida)
            .length
        ) +
        " noches"
      );
    }
  };
  return (
    <div className="info-reservacion">
      {reservacionEnfocada && (
        <Fragment>
          <h1>Reservación</h1>
          <p className="resumen-header">{resumenHeaderReservacion()}</p>
          <div className="huesped">
            <p className="nombre">{reservacionEnfocada.cliente}</p>
            <p className="botones-huesped">
              <span>Mostrar el perfil</span> · <span>Mensaje</span>
            </p>
            <img
              src="https://a0.muscache.com/defaults/user_pic-225x225.png?v=3"
              alt="foto de perfil"
            />
          </div>
          <div className="llegada">
            <p>Llegada</p>
            <p>
              {abreviacionesDiaDeSemana[reservacionEnfocada.llegada.getDay()]}
              ., {reservacionEnfocada.llegada.getDate()}{" "}
              {abreviacionMeses[reservacionEnfocada.llegada.getMonth()]}
            </p>
          </div>
          <div className="salida">
            <p>Salida</p>
            <p>
              {" "}
              {abreviacionesDiaDeSemana[reservacionEnfocada.salida.getDay()]}
              ., {reservacionEnfocada.salida.getDate()}{" "}
              {abreviacionMeses[reservacionEnfocada.salida.getMonth()]}
            </p>
          </div>
          <div className="huespedes">
            <p>Total de huéspedes</p>
            <p>{reservacionEnfocada.huespedes} adultos</p>
          </div>
          <div className="cobro">
            <p>Total del cobro</p>
            <p>{reservacionEnfocada.costo} €</p>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Reservacion;
