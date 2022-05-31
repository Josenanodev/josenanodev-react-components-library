import arrayDeFechas from "../utils/arrayDeFechas";
import jsToSqlDate from "../utils/jsToSqlDate";
import generadorDeCodigoTemp from "../utils/generadorDeCodigoTemp";

// const arrayDeFechas = require("../utils/arrayDeFechas")
// const jsToSqlDate = require("../utils/jsToSqlDate")
// const generadorDeCodigoTemp = require("../utils/generadorDeCodigoTemp")

//Variables
const milisegundosDeUnDia = 86400000; //No modificar
const nombres = [
  "Julian Cortez",
  "Daniela Silva",
  "Pablo Nuno",
  "Andrea Robles",
  "Amira Diaz",
  "Ricardo Lopez",
  "Linda Masso",
  "Juan Cardenas",
  "Celeste Lopez",
  "Nicolas Bravo",
];
const indiceDeOcupacion = 0.1;
const indiceDeBloqueo = 0.1;
const maximaLongitudReservacion = 4;
const maximoDeHuespedes = 8;

export function apiGetInformacionFechasAnuncios(
  listaAnuncios,
  fechaIncio,
  fechaFin
) {
  if (!Array.isArray(listaAnuncios))
    throw new Error("La lista de anuncios debe ser un Array");
  if (!(fechaIncio instanceof Date))
    throw new Error("fechaIncio no es una fecha");
  if (!(fechaFin instanceof Date)) throw new Error("fechaFin no es una fecha");
  let fechas = arrayDeFechas(fechaIncio, fechaFin);
  let respuesta = {};
  listaAnuncios.forEach((anuncio) => {
    respuesta[anuncio] = {};
    fechas.forEach((fecha) => {
      if (!respuesta[anuncio][jsToSqlDate(fecha)]) {
        let reservacion = Math.random() <= indiceDeOcupacion;
        if (reservacion) {
          let _id = generadorDeCodigoTemp();
          let cliente = nombres[Math.floor(Math.random() * 10)];
          let huespedes = Math.ceil(Math.random() * maximoDeHuespedes);
          let salida = new Date(
            Date.parse(fecha) +
              milisegundosDeUnDia *
                Math.ceil(Math.random() * maximaLongitudReservacion)
          );
          let costo =
            Math.floor(Math.random() * 100 + 100) *
            (arrayDeFechas(fecha, salida).length - 1);
          let arrayReservacion = arrayDeFechas(
            fecha,
            new Date(Date.parse(salida) - milisegundosDeUnDia)
          );
          arrayReservacion.forEach((noche) => {
            respuesta[anuncio][jsToSqlDate(noche)] = {
              bloqueo: Math.random() <= indiceDeBloqueo,
              precio: Math.floor(Math.random() * 100 + 100),
              reservacion: {
                _id: _id,
                cliente: cliente,
                llegada: fecha,
                salida: salida,
                huespedes: huespedes,
                costo: costo,
                estatus: "Confirmada",
              },
            };
          });
        } else {
          respuesta[anuncio][jsToSqlDate(fecha)] = {
            bloqueo: Math.random() <= indiceDeBloqueo,
            precio: Math.floor(Math.random() * 100 + 100),
            reservacion: false,
          };
        }
      }
    });
  });
  return respuesta;
}

export function apiGetListadoAnunciosIds() {
  let listadoIds = [];
  for (let index = 0; index < 50000; index++) {
    listadoIds[index] = index + 1;
  }
  return listadoIds;
}
