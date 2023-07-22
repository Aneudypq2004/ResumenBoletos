import Header from './components/Header'
import Footer from './components/Footer'
import QrCode from './components/QrCode'
import Spinner from './components/Spinner'
import { useState, useEffect } from 'react'

function App() {

  const [titulo, setTitulo] = useState('oppenheimer');
  const [movieData, setMovieData] = useState({});
  const [load, setLoad] = useState(false);

  // OBTENE EL PARAM ID DE LA URL

  const params = new URL(window.location.href).searchParams.get('id');

  // CONSULTAR API omdbapi

  useEffect(() => {

    const consultarApi = async () => {

      try {

        setLoad(true);

        const response = await fetch(`https://www.omdbapi.com/?t=${titulo}&y=2023&apikey=48e7e221`);

        const data = await response.json();

        setMovieData(data);

        setLoad(false);

      } catch (error) {

        Console.log("Ha ocurrido un error");

        setLoad(false);
      }

    };

    consultarApi()

  }, []);


  return (
    <>

      {/* Si esta cargando mostrar spinner */}

      {load ?
        (
          <div className='spinner'>

            <Spinner />

          </div>
        )
        : (

          <>

            <Header />

            <main className='principal'>

              <h2 className='sub'>Resumen de tu boleto</h2>

              <section className='contenedor'>

                <QrCode />

                <div className='info-movie card'>

                  <h3>{movieData.Title}</h3>

                  <div className='image-data'>

                    <img width={180} src={movieData.Poster} alt="" />

                    <div className='movie-data'>

                      <p>Estreno:  <span>{movieData.Released} </span> </p>

                      <p>Clasificación : <span>{movieData.Rated}</span> </p>

                      <p>Duración:  <span>{movieData.Runtime}</span> </p>

                      <p>Género: <span> {movieData.Genre}</span> </p>

                    </div>

                  </div>

                </div>

              </section>

            </main>
            <Footer />

          </>
        )
      }
    </>
  )
}

export default App
