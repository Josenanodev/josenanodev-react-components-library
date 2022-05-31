function generadorDeCodigoTemp() {
    let fecha = new Date(Date.now());
    let codigo = (Math.random() * fecha.getDate()) * (Math.random() * (fecha.getMonth() + 1)) * (Math.random() * fecha.getFullYear());
    codigo = fecha.getTime() / codigo;
    codigo = Math.ceil(codigo);
    codigo = codigo.toFixed(0);
    return codigo;
}

export default generadorDeCodigoTemp;


