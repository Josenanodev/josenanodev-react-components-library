export function defineVisibleValue(
  posicion: number,
  ancho: number,
  valorMaximo: number,
  valorMinimo: number
) {
  return Math.round(
    (posicion / (ancho)) * (valorMaximo - valorMinimo) + valorMinimo
  );
}

export function definePostionByValue(
  nuevoValor: number,
  ancho: number,
  valorMaximo: number,
  valorMinimo: number
) {
  return ((nuevoValor - valorMinimo) / (valorMaximo - valorMinimo)) * (ancho);
}
