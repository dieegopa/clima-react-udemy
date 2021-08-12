import Formulario from "./components/Formulario";
import Header from "./components/Header";
import React from "react";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  const [busqueda, setBusqueda] = React.useState({
    ciudad: "",
    pais: "",
  });

  const [consultar, setConsultar] = React.useState(false);

  const [resultado, setResultado] = React.useState({});

  const [error, setError] = React.useState(false);


  const { ciudad, pais } = busqueda;

  React.useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&units=metric&appid=${process.env.REACT_APP_CLIMA_API_KEY}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado);
        setConsultar(false);

        if (resultado.cod === "404") {
          setError(true);
        } else {
          setError(false);
        }
      }
    };

    consultarAPI();
    // eslint-disable-next-line
  }, [consultar]);



  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultados" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <>
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
