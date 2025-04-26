import React, { useState, useEffect } from "react";
import getWeatherIcon from "./weathericon.js";
import "./App.css";

import cloudy from "./img/cloudy.gif";
import cloudyn from "./img/cloudyn.gif";
import nightClear from "./img/nightclear.gif";
import nightCloud from "./img/nightcloud.gif";
import overCastd from "./img/overcastd.gif";
import overCastn from "./img/overcastn.gif";
import partlyCloud from "./img/partlycloud.gif";
import raind from "./img/raind.gif";
import rainn from "./img/rainn.gif";
import stormd from "./img/stormd.gif";
import stormn from "./img/stormn.gif";
import sunny from "./img/sunny.gif";

const App = () => {
  const [location, setLocation] = useState(""); // Vị trí nhập từ người dùng
  const [showApp, setShowApp] = useState(false); // Hiển thị ứng dụng chính
  const [weather, setWeather] = useState(null); // Dữ liệu thời tiết
  const apiKey = "0517ac7c7534525453d9ceaed565af2d";
  const units = "metric";

  // Xác định hướng gió
  const windDir = (dir) =>
    [
      "N",
      "N/NE",
      "NE",
      "E/NE",
      "E",
      "E/SE",
      "SE",
      "S/SE",
      "S",
      "S/SW",
      "SW",
      "W/SW",
      "W",
      "W/NW",
      "NW",
      "N/NW",
    ][Math.round(dir / 22.5) % 16] || "Invalid direction";
  // Gán ảnh cho các mã thời tiết
  const weather_icon = (dir) => {
    if (dir === "01d") return sunny;
    if (dir === "01n") return nightClear;
    if (dir === "02d") return partlyCloud;
    if (dir === "02n") return nightCloud;
    if (dir === "03d") return cloudy;
    if (dir === "03n") return cloudyn;
    if (dir === "04d") return overCastd;
    if (dir === "04n") return overCastn;
    if (dir === "09d") return raind;
    if (dir === "09n") return rainn;
    if (dir === "10d") return raind;
    if (dir === "10n") return rainn;
    if (dir === "11d") return stormd;
    if (dir === "11n") return stormn;
    //if (dir === "13d") return "snowflake";
    //if (dir === "13n") return "snowflake";
    if (dir === "50d") return "./img/fog.gif";
    if (dir === "50n") return "./img/fog.gif";
    return "default";
  };

  // Gọi API để lấy dữ liệu thời tiết
  const fetchWeather = async (loc) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=${units}&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  //cập nhật mỗi 0.5p
  useEffect(() => {
    const interval = setInterval(() => {
      if (location) {
        fetchWeather(location);
      }
    }, 30000); // 0.5 phút
    return () => clearInterval(interval);
  }, [location]);
  // Xử lý khi người dùng nhập vị trí
  const handleSubmit = () => {
    if (location.trim()) {
      fetchWeather(location.trim());
      setShowApp(true);
    } else {
      alert("Vui lòng nhập vị trí chi tiết!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {!showApp ? (
        // Giao diện nhập vị trí
        <>
          <h1>Nhập Vị Trí</h1>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Nhập tên thành phố hoặc địa điểm"
          />
          <button onClick={handleSubmit}>Xác Nhận</button>
        </>
      ) : weather ? (
        // Hiển thị thông tin thời tiết
        <div>
          <div className="ico">
            <img src={weather_icon(weather.weather[0].icon)}></img>
          </div>
          {location} {new Date(weather.dt * 1000).toLocaleString()}
          <p>Ghi chú: {getWeatherIcon(weather.weather[0].icon).note}</p>
          <div className="info">
            <p></p>
            <p>Nhiệt Độ: {weather.main.temp}°C</p>
            <p>Độ ẩm: {weather.main.humidity}%</p>
            <p>Áp suất: {weather.main.pressure}hPa</p>
            <p>Mây: {weather.weather[0]?.description}</p>
            <p>Gió: {weather.wind.speed}m/s</p>
            <p>Hướng Gió: {windDir(weather.wind.deg)}</p>
          </div>
        </div>
      ) : (
        // Loading
        <p>Đang tải dữ liệu thời tiết...</p>
      )}
    </div>
  );
};

export default App;
