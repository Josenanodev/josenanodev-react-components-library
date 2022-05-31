function arrayDeFechas(entrada, salida) {
  let fechaMinima = new Date(entrada);
  fechaMinima.setHours(0, 0, 0)
  fechaMinima = Date.parse(fechaMinima);
  let fechaMaxima = new Date(salida);
  fechaMaxima.setHours(0, 0, 0)
  fechaMaxima = Date.parse(fechaMaxima);
  const milisegundosDeUnDia = 86400000;
  let array = [];
  for (
    let index = 0;
    fechaMinima + milisegundosDeUnDia * index <= fechaMaxima;
    index++
  ) {
    array.push(new Date(fechaMinima + milisegundosDeUnDia * index));
  }
  return array
}

export default arrayDeFechas;

