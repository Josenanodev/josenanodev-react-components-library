import React from "react";
import "./Anuncio.css";

const Anuncio = ({ idAnuncio, alto }) => {
  return (
    <div
      className="anuncio"
      style={{
        height: alto,
      }}
    >
      <img
        src="https://a0.muscache.com/im/pictures/miso/Hosting-52619643/original/e3408fb0-20e8-4102-a993-70d1c911abef.jpeg?aki_policy=small"
        alt="imagen de anuncio"
      />
      <p>Anuncio {idAnuncio}</p>
    </div>
  );
};

export default Anuncio;
