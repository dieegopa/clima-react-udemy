import React from "react";
import Error from "./Error";
import PropTypes from "prop-types";
import M from 'materialize-css'

const Formulario = ({ busqueda, setBusqueda, setConsultar }) => {
  const [error, setError] = React.useState(false);

  const [paises, setPaises] = React.useState([]);

  const [ciudades, setCiudades] = React.useState([]);

  const [ciudadesFiltado, setCiudadesFiltrado] = React.useState([]);

  const { ciudad, pais } = busqueda;

  const handleChange = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePais = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
    const paisesFiltrado = paises.filter(
      (pais) => e.target.value === pais.iso3
    );
    const paisBusqueda = paisesFiltrado[0].name;

    const ciudadesFiltrado = ciudades.filter(
      (ciudad) => ciudad.country === paisBusqueda
    );

    setCiudadesFiltrado(ciudadesFiltrado[0].cities);

    console.log('aqui')
    setTimeout(() => {
      var elementos = document.querySelectorAll("select");
      M.FormSelect.init(elementos);
    }, 500);

    console.log('aqui2')

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ciudad.trim() || !pais.trim()) {
      setError(true);
      return;
    }

    setError(false);
    setConsultar(true);
  };

  React.useEffect(() => {
    const consultarPaises = async () => {
      const url = "https://countriesnow.space/api/v0.1/countries/states";
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setPaises(resultado.data);
    };

    const consultarCiudades = async () => {
      const url = "https://countriesnow.space/api/v0.1/countries";
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setCiudades(resultado.data);
    };

    consultarPaises();
    consultarCiudades();
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <div className="input-field col s12">
        <select
          name="pais"
          id="pais"
          value={pais}
          onChange={(e) => handleChangePais(e)}
        >
          <option value="">-- Seleccione un Pais --</option>
          {paises.map((item) => {
            return (
              <option key={item.iso3} value={item.iso3}>
                {item.name}
              </option>
            );
          })}
        </select>
        <label htmlFor="pais">Pais: </label>
      </div>

      <div className="input-field col s12">
        <select
          name="ciudad"
          id="ciudad"
          value={ciudad}
          onChange={(e) => handleChange(e)}
        >
          <option value="">-- Seleccione una ciudad --</option>
          {ciudadesFiltado.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <label htmlFor="pais">Ciudad: </label>
      </div>

      <div className="input-field col s12">
        <button
          type="submit"
          className="waves-effect waves-light btn-large btn-block yellow accent-4 col s12"
        >
          Buscar Clima
        </button>
      </div>
    </form>
  );
};

Formulario.propTypes = {
  busqueda: PropTypes.object.isRequired,
  setBusqueda: PropTypes.func.isRequired,
  setConsultar: PropTypes.func.isRequired,
};

export default Formulario;
