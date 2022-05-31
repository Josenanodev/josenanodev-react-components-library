import React, { useState, useEffect, Fragment } from "react";
import "./EditorFechas.css";

//Redux
import { useSelector } from "react-redux";
import * as FechasAnunciosSelectors from "../../redux/Selectors/FechasAnunciosSelector";

//iconos
import { BsX, BsArrowRight } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";

const EditorFechas = () => {
  //Redux
  const rangoFechaAnunciosSeleccionado = useSelector((state) =>
    FechasAnunciosSelectors.rangoFechaAnunciosSeleccionado(state)
  );
  //Estados
  const [visible, setVisible] = useState(false);
  const [seleccion, setSeleccion] = useState({
    inicio: undefined,
    fin: undefined,
    anuncio1: undefined,
    anuncio2: undefined,
  });
  //UseEffect
  useEffect(() => {
    if (
      rangoFechaAnunciosSeleccionado.seleccion1.fecha &&
      rangoFechaAnunciosSeleccionado.seleccion2.fecha &&
      rangoFechaAnunciosSeleccionado.seleccion1.anuncio &&
      rangoFechaAnunciosSeleccionado.seleccion2.anuncio
    ) {
      setVisible(true);
      setSeleccion({
        inicio:
          Date.parse(rangoFechaAnunciosSeleccionado.seleccion1.fecha) <=
          Date.parse(rangoFechaAnunciosSeleccionado.seleccion2.fecha)
            ? rangoFechaAnunciosSeleccionado.seleccion1.fecha
            : rangoFechaAnunciosSeleccionado.seleccion2.fecha,
        fin:
          Date.parse(rangoFechaAnunciosSeleccionado.seleccion1.fecha) >=
          Date.parse(rangoFechaAnunciosSeleccionado.seleccion2.fecha)
            ? rangoFechaAnunciosSeleccionado.seleccion1.fecha
            : rangoFechaAnunciosSeleccionado.seleccion2.fecha,
        anuncio1: rangoFechaAnunciosSeleccionado.seleccion1.anuncio,
        anuncio2: rangoFechaAnunciosSeleccionado.seleccion2.anuncio,
      });
    } else {
      setVisible(false);
      setSeleccion({
        inicio: undefined,
        fin: undefined,
        anuncio1: undefined,
        anuncio2: undefined,
      });
    }
  }, [rangoFechaAnunciosSeleccionado]);
  return (
    <form className="info-seleccion">
      {visible && (
        <Fragment>
          <div className="div-fechas-seleccionadas">
            <p>Fechas seleccionadas</p>
            <div className="inputs-fechas">
              <input
                type="date"
                defaultValue={
                  seleccion.inicio && seleccion.inicio.toJSON().slice(0, 10)
                }
              />
              <BsArrowRight />
              <input
                type="date"
                defaultValue={
                  seleccion.fin && seleccion.fin.toJSON().slice(0, 10)
                }
              />
              <BsX />
            </div>
          </div>
          <div className="div-disponibilidad">
            <p>Disponibilidad</p>
            <div>
              <input
                id="input-radio-disponible"
                type="radio"
                name="disponibilidad"
                value={true}
              />
              <label htmlFor="input-radio-disponible">Disponible</label>
            </div>
            <div>
              <input
                id="input-radio-bloqueado"
                type="radio"
                name="disponibilidad"
                value={false}
              />
              <label htmlFor="input-radio-bloqueado">Bloqueado</label>
            </div>
          </div>
          <div className="div-precio-noche">
              <p>Precio por noche</p>
          <div className="input-precio-noche">
            <MdAttachMoney /> <input type="number" placeholder="XX €" />
          </div>
          </div>
        
          <p>Conjuntos de reglas</p>
          <div className="input-conjunto-reglas">
            <p>Varias</p>
            <select>
              <option>Conjunto 1</option>
              <option>Conjunto 2</option>
              <option>Conjunto 3</option>
            </select>
          </div>
        </Fragment>
      )}
    </form>
  );
};

export default EditorFechas;
