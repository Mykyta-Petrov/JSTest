import React, { useEffect, useState } from 'react'
import LocationForm from '../components/LocationForm';

function Home() {
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);

  const currDate = new Date();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (country && state) {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/${country.name},${state.name}/${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}?key=${process.env.REACT_APP_API_KEY}`);
          setWeatherData(await response.json());
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [country, state]);

  function submitHandler(values) {
    setCountry(values.country);
    setState(values.state);
  }

  return (
    <div>
      <LocationForm submitHandler={submitHandler}/>
      {country && state && <h2>Weather forecast for {country.name}, {state.name}, {currDate.toDateString()}</h2>}
      <h4>{weatherData?.days[0]?.description}</h4>
      <div>
        {weatherData?.days[0]?.hours?.map((hour) => (
          <div>
            {hour.datetime} {hour.temp}F {hour.conditions}
          </div>))}
      </div>
    </div>
  )
}

export default Home