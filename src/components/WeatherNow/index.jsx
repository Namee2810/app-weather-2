import { message } from "antd";
import atmosphereImg from "public/images/atmosphere.png";
import clearImg from "public/images/clear.png";
import cloudsImg from "public/images/clouds.png";
import drizzleImg from "public/images/drizzle.png";
import rainImg from "public/images/rain.png";
import snowImg from "public/images/snow.png";
import thunderstormImg from "public/images/thunderstorm.png";
import React, { useEffect } from 'react';
import { RiShareBoxFill } from "react-icons/ri";
import "./style.scss";

const convertTemp = (temp) => Math.round(temp - 272.15);

function WeatherNow(props) {
  const { weatherNow, setPlaces } = props;
  const now = (() => {
    const date = new Date();
    return `${date.getDate()}, tháng ${date.getMonth() + 1}`
  })()

  const handleAddPlace = () => {
    const places = JSON.parse(localStorage.getItem("places"));
    const place = `${weatherNow.name}, ${weatherNow.sys.country}`;
    if (places.includes(place))
      return message.error("Địa điểm này đã có trong danh sách")
    places.push(place);
    localStorage.setItem("places", JSON.stringify(places))
    message.success("Đã thêm địa điểm " + place)
    setPlaces(places)
  }

  useEffect(() => {
    if (weatherNow) {
      switch (("" + weatherNow.weather[0].id).slice(0, 1)) {
        case "2": {
          weatherNow.weather[0].id = thunderstormImg;
          break;
        }
        case "3": {
          weatherNow.weather[0].id = drizzleImg;
          break;
        }
        case "5": {
          weatherNow.weather[0].id = rainImg;
          break;
        }
        case "6": {
          weatherNow.weather[0].id = snowImg;
          break;
        }
        case "7": {
          weatherNow.weather[0].id = atmosphereImg;
          break;
        }
        case "8": {
          if (weatherNow.weather[0].id === 800) weatherNow.weather[0].id = clearImg;
          else weatherNow.weather[0].id = cloudsImg;
          break;
        }
        default: break;

      };
    }
  }, [weatherNow])
  return (
    <div className="WeatherNow">
      {
        weatherNow &&
        <div>
          <div className="WeatherNow_city">
            {weatherNow.name}, {weatherNow.sys.country}&nbsp;
            <a href={`https://www.google.com/maps/@${weatherNow.coord.lat},${weatherNow.coord.lon},12z`} target="_blank" rel="noopener noreferrer">
              <RiShareBoxFill style={{ verticalAlign: "middle" }} />
            </a>
            <div className="WeatherNow_city-add" onClick={handleAddPlace}>Thêm +</div>
          </div>
          <div className="WeatherNow_time">
            <img src={weatherNow.weather[0].id} alt="" />
            <div>
              <div className="text-white">Hôm nay</div>
              <div>{now}</div>
            </div>
          </div>
          <div className="WeatherNow_degree text-white">
            {convertTemp(weatherNow.main.temp_max)}
            <span>°C</span>
          </div>
          <div>
            {`${weatherNow.weather[0].main}, ${weatherNow.weather[0].description}`}
          </div>
          <div >
            Cảm giác: {convertTemp(weatherNow.main.feels_like)}°C •
            Mặt trời lặn: {(() => {
              let date = new Date(weatherNow.sys.sunset * 1000);
              return `${date.getHours()}:${date.getMinutes()}`
            })()}
          </div>
        </div>
      }

    </div >

  );
}

export default WeatherNow;