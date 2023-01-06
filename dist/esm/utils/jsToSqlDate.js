/**
 *
 * @param jsDate Date Object
 * @returns string of sql date format, for example 1993-03-29
 */
function jsToSqlDate(jsDate) {
    //Con esta función cuidamos que le formado de sqlDate nunca arroje cosas como YYYY-M-D
    const islowerThanTen = (numero) => {
        return Number(numero) < 10 ? "-0" : "-";
    };
    //Es necesario sumar 1 al mes ya que enero comienza en 0
    let sqlDate = jsDate
        .getFullYear()
        .toString()
        .concat(islowerThanTen(jsDate.getMonth() + 1), (jsDate.getMonth() + 1)
        .toString()
        .concat(islowerThanTen(jsDate.getDate()), jsDate.getDate().toString()));
    return sqlDate;
}
export default jsToSqlDate;
