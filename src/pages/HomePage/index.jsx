import api from 'api/api';
import Header from 'components/Header';
import PlacesList from 'components/PlacesList';
import WeatherForeCast from "components/WeatherForeCast";
import WeatherNow from 'components/WeatherNow';
import React, { useEffect, useState } from 'react';
import "./style.scss";

function HomePage(props) {
  const [weatherForeCast, setWeatherForeCast] = useState();
  const [weatherNow, setWeatherNow] = useState();
  const [places, setPlaces] = useState(JSON.parse(localStorage.getItem("places")))

  useEffect(() => {
    if (!localStorage.getItem("places")) {
      const newPlaces = ["Hanoi, VN", "Ho Chi Minh City, VN"];
      localStorage.setItem("places", JSON.stringify(newPlaces))
      setPlaces(newPlaces);
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }
        setWeatherNow(await api.nowByCoords(coords))
        setWeatherForeCast(await api.foreCastByCoords(coords))
      })
    }
    const getWeatherByCity = async () => {
      setWeatherNow(await api.nowByCity("hanoi"))
      setWeatherForeCast(await api.foreCastByCity("hanoi"))
    }
    getWeatherByCity();
  }, [])

  return (
    <div className="HomePage">
      <Header setWeatherNow={setWeatherNow} setWeatherForeCast={setWeatherForeCast} />
      <PlacesList setWeatherNow={setWeatherNow} setWeatherForeCast={setWeatherForeCast}
        places={places} setPlaces={setPlaces} />
      <WeatherForeCast weatherForeCast={weatherForeCast} />
      <WeatherNow weatherNow={weatherNow} setPlaces={setPlaces} />
    </div>
  );
}

export default HomePage;