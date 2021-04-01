import { message } from "antd";
import api from "api/api";
import classNames from "classnames";
import React, { useState } from 'react';
import "./style.scss";

function PlacesList(props) {
  const { setWeatherNow, setWeatherForeCast, places, setPlaces } = props;
  const [place, setPlace] = useState();

  const handleSelectPlace = async (idx, place) => {
    setPlace(idx);
    setWeatherNow(await api.nowByCity(place))
    setWeatherForeCast(await api.foreCastByCity(place))
  }
  const handleAddPlace = () => {
    document.getElementById("Header_search-box").focus();
    message.info("Nhập tên địa điểm")
  }
  const handleRemovePlace = (idx) => {
    let newPlaces = places;
    newPlaces.splice(idx, 1);
    setPlaces(newPlaces);
    localStorage.setItem("places", JSON.stringify(newPlaces))
  }

  return (
    <div className="PlacesList">
      {
        places && places.map((item, idx) => (
          <div key={idx}
            className={classNames("PlacesList_card", { "PlacesList_card-select": place === idx })}
            onClick={() => handleSelectPlace(idx, item)}
          >
            <div className="PlacesList_card-title">{item}</div>
            <div className="PlacesList_card-remove" onClick={() => handleRemovePlace(idx)}>+</div>
          </div>
        ))
      }
      <div className="PlacesList_card" onClick={handleAddPlace}>
        <div className="PlacesList_card-title" style={{ fontSize: "24px" }}>+</div>
      </div>
    </div >
  );
}

export default PlacesList;