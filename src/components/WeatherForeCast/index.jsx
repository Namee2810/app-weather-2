import atmosphereImg from "public/images/atmosphere.png";
import clearImg from "public/images/clear.png";
import cloudsImg from "public/images/clouds.png";
import drizzleImg from "public/images/drizzle.png";
import humidityImg from "public/images/humidity.png";
import rainImg from "public/images/rain.png";
import snowImg from "public/images/snow.png";
import tempImg from "public/images/temp.png";
import thunderstormImg from "public/images/thunderstorm.png";
import visibility from "public/images/visibility.png";
import React, { useEffect, useState } from 'react';
import { MdTrendingFlat } from "react-icons/md";
import "./style.scss";

const convertTemp = (temp) => Math.round(temp - 272.15);
const getDayName = (day) => {
  if (day === 0) return "Chủ nhật";
  return `Thứ ${day + 1}`
}

function WeatherForeCast(props) {
  const { weatherForeCast } = props;
  const [weather, setWeather] = useState();
  useEffect(() => {
    if (weatherForeCast) {
      let filterWeather = weatherForeCast.list.filter((item) => item.dt_txt.split(" ")[1] === "12:00:00");
      filterWeather.forEach(item => {
        item.dt = getDayName(new Date(item.dt * 1000).getDay());
        switch (("" + item.weather[0].id).slice(0, 1)) {
          case "2": {
            item.weather[0].id = thunderstormImg;
            break;
          }
          case "3": {
            item.weather[0].id = drizzleImg;
            break;
          }
          case "5": {
            item.weather[0].id = rainImg;
            break;
          }
          case "6": {
            item.weather[0].id = snowImg;
            break;
          }
          case "7": {
            item.weather[0].id = atmosphereImg;
            break;
          }
          case "8": {
            if (item.weather[0].id === 800) item.weather[0].id = clearImg;
            else item.weather[0].id = cloudsImg;
            break;
          }
          default: break

        };
      })
      setWeather(filterWeather);
    }
  }, [weatherForeCast])
  return (
    <div className="WeatherForeCast">
      <div className="WeatherForeCast_header">
        Dự báo thời tiết 5 ngày
      </div>
      <table className="WeatherForeCast_statistic">
        <tbody>
          {weather && weather.map((item, idx) => (
            <tr key={idx}>
              <th>{item.dt}</th>
              <th>
                <img src={humidityImg} alt="" className="WeatherForeCast_statistic-icon" />
                {item.main.humidity}%
              </th>
              <th>
                <img src={item.weather[0].id} alt="" className="WeatherForeCast_statistic-weather" />
              </th>
              <th><img src={tempImg} alt="" className="WeatherForeCast_statistic-icon" />
                {convertTemp(item.main.temp_max)}°C
                </th>
              <th>
                <MdTrendingFlat style={{ transform: `rotateZ(${item.wind.deg + 45}deg)` }} />{Math.round(item.wind.speed * 3.6)}km/h
              </th>
              <th>
                <img src={visibility} alt="" className="WeatherForeCast_statistic-icon" /> {item.visibility / 1000}km
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeatherForeCast;