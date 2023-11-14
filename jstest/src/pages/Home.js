import React, { useEffect, useState } from 'react'

function Home() {
  const country = 'Ukraine';
  const city = 'Kharkiv';
  const [currDate, setCurrDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/${city},${country}/${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}?key=${process.env.REACT_APP_API_KEY}`);
        setWeatherData(await response.json());
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Weather forecast for {city}, {country}, {currDate.toDateString()}</h2>
      <div>{weatherData?.days[0]?.description}</div>
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