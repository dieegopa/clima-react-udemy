import React from "react";
import PropTypes from "prop-types";

const Clima = ({ resultado }) => {
  const { name, main } = resultado;

  if (!name) return null;

  return (
    <div className="card-panel col s12 white">
      <div className="black-text">
        <h2>El clima de {name} es: </h2>
        <p className="temperatura">
          {parseInt(main.temp)} <span>&#x2103;</span>
        </p>
        <p>
          Temperatura Maxima: {parseInt(main.temp_max)} <span>&#x2103;</span>
        </p>
        <p>
          Temperatura Minima: {parseInt(main.temp_min)} <span>&#x2103;</span>
        </p>
      </div>
    </div>
  );
};

Clima.propTypes = {
  resultado: PropTypes.object.isRequired,
};

export default Clima;
