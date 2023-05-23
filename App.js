import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';

import Layout from './components/Layout/Layout';
import LeftAside from './components/LeftAside/LeftAside';
import Search from './components/LeftAside/Search';
import RightAside from './components/RightAside/RightAside';

function App() {
  const [woeid, setWoeid] = useState('12586539');
  const [location, setLocation] = useState('');
  const [loc, setLoc] = useState('');
  const [toggle, setToggle] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [visibility, setVisibility] = useState('true');

  // Fetching the current Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      getID(position.coords.latitude, position.coords.longitude);
    });

    const getID = async (lat, long) => {
      console.log('Position', lat, long);
      if (lat !== 0 && long !== 0) {
        console.log('Fetching current date Weather information');
        const res = await fetch(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}
          `
        );

        res
          .json()
          .then((response) => {
            setWoeid(response[0].woeid);
          })
          .then(async (result) => {
            const temp = await fetch(
              `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`
            );

            const temperature = await temp.json();
            setWeatherInfo(temperature.consolidated_weather);
            setVisibility(false);
          })
          .catch((error) => {
            alert('Location not found!, Please try nearest Location');
          });
      }
    };
  }, []);

  // Process request based on the search made by user and return data
  const tempHandler = async () => {
    setVisibility(true);
    const getID = async () => {
      const res = await fetch(
        `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${location}`
      );

      res
        .json()
        .then((response) => {
          setWoeid(response[0].woeid);
        })
        .then(async (result) => {
          const temp = await fetch(
            `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`
          );

          const temperature = await temp.json();
          setWeatherInfo(temperature.consolidated_weather);
          setVisibility(false);
        })
        .catch((error) => {
          alert('Location not found!, Please try nearest Location');
        });
    };

    getID();
  };

  return (
    <>
      <Loader
        type='Grid'
        color='#01697D'
        height={100}
        width={100}
        timeout={500000000}
        visible={visibility ? true : false}
        height='60px'
        style={{
          top: '50%',
          left: '50%',
          position: 'absolute',
          transform: 'translate(-50%,-50%)',
          zIndex: '10',
        }}
      />
      <Layout title='Weather App'>
        <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-6 h-screen p-10'>
          {/* Weather Info */}
          <aside className='col-span-1 lg:col-span-2 bg-blue-lighter h-full left-side md:bg-cloud-image md:bg-bottom lg:bg-cloud-image bg-no-repeat bg-bottom bg-contain opacity-40'>
            <LeftAside
              location={location}
              setLocation={setLocation}
              toggle={toggle}
              setToggle={setToggle}
              weatherInfo={weatherInfo}
              loc={loc}
            />
            <Search
              toggle={toggle}
              location={location}
              setToggle={setToggle}
              setLocation={setLocation}
              tempHandler={tempHandler}
              setLoc={setLoc}
            />
          </aside>
          {/* Main Info */}
          <aside className='col-span-1 lg:col-span-4 bg-blue-dark h-full opacity-40'>
            <RightAside weatherInfo={weatherInfo} />
          </aside>
        </div>
      </Layout>
    </>
  );
}

export default App;
