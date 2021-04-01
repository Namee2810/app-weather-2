import { message } from 'antd';
import api from 'api/api';
import React, { useRef, useState } from 'react';
import { MdGpsFixed, MdKeyboardVoice } from "react-icons/md";
import { RiSearch2Line } from "react-icons/ri";
import "./style.scss";


function Header(props) {
  const { setWeatherNow, setWeatherForeCast } = props;

  const [voiceOn, setVoiceOn] = useState(false);
  const inputRef = useRef();

  const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
  const recognition = new speechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'vi-VN';
  recognition.onresult = function (event) {
    const resultIndex = event.resultIndex;
    const result = event.results[resultIndex][0].transcript;
    inputRef.current.value = result;
    getWeatherData(result)
  }
  recognition.onerror = (err) => {
    switch (err.error) {
      case "aborted": {
        message.warning('Bấm quá nhanh, vui lòng chờ');
        break
      }
      case "not-allowed": {
        message.warning('Hãy cấp quyền sử dụng micro cho trang web');
        break
      }
      case "no-speech": {
        message.warning('Không thể nhận diện giọng nói');
        break
      }
      default: {
        message.warning('Lỗi không xác định');
        break
      }
    }
    console.log(err.error);
    setVoiceOn(false);
  }
  recognition.onspeechend = () => {
    setVoiceOn(false);
  }

  const handleClickVoice = () => {
    setVoiceOn(!voiceOn)
    if (!voiceOn) {
      recognition.start();
    }
    else {
      recognition.stop();
    }
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let city = inputRef.current.value
    if (city) getWeatherData(city);
  }

  const getWeatherData = async (value) => {
    await api.nowByCity(value).then(async res => {
      setWeatherNow(res)
      setWeatherForeCast(await api.foreCastByCity(value))
    })
      .catch(err => {
        message.error("Không tìm thấy thành phố!");
        inputRef.current.value = "";
      })
  }
  const handleClickLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }
        setWeatherNow(await api.nowByCoords(coords))
        setWeatherForeCast(await api.foreCastByCoords(coords))
        message.success("Định vị thành công")
      },
        () => message.warning("Hãy cấp quyền định vị cho trang web")
      )
    }
  }

  return (
    <div className="Header">
      <form className="Header_search" onSubmit={handleSubmitForm}>
        <RiSearch2Line className="Header_search-icon" />
        <input type="text" name="search"
          ref={inputRef}
          placeholder="Nhập tên địa điểm ..."
          className="Header_search-box"
          id="Header_search-box"
        />
        {voiceOn ? <div className="Header_search-voice--on" onClick={handleClickVoice} />
          : <MdKeyboardVoice className="Header_search-voice" onClick={handleClickVoice} />}
        <MdGpsFixed onClick={handleClickLocate} />
      </form>
    </div>
  );
}

export default Header;