import React, { useState, useEffect } from "react";
import "./App.css";
import "./loader/cursor.js";
import "./loader/cursor.css";
import getWeatherIcon from "./weathericon.js";
import LoadingAnimation from "./loader/LoadingAnimation.js";

// //---------img----------------------//
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
import vidbg from "./img/backvid.mp4";
//---------img----------------------//

const App = () => {
  const [location, setLocation] = useState(
    localStorage.getItem("location") || ""
  );
  const [Loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [showApp, setShowApp] = useState(!!localStorage.getItem("location"));
  const [error, setError] = useState(false); // Thêm trạng thái lỗi

  const apiKey = "983852ff3420c6319ff06fef215971f5";
  const units = "metric";

  const fetchWeather = async (loc) => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=${units}&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Vị trí không hợp lệ"); // Kiểm tra lỗi API
      }
      const data = await response.json();
      setWeather(data);
      setError(false);
    } catch (error) {
      setWeather(null);
      setError(true); // Nếu nhập sai, đặt trạng thái lỗi thành `true`
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

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
    if (dir === "50d") return "./img/fog.gif";
    if (dir === "50n") return "./img/fog.gif";
    return "default";
  };
  // Gán hướng gió
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

  useEffect(() => {
    if (location) fetchWeather(location);
  }, []);

  const handleSubmit = () => {
    if (location.trim()) {
      localStorage.setItem("location", location.trim());
      setShowApp(true);
      fetchWeather(location.trim()); // Gọi API ngay khi nhập vị trí
    } else {
      alert("Vui lòng nhập vị trí!");
    }
  };

  const handleGoBack = () => {
    localStorage.removeItem("location");
    setLocation("");
    setShowApp(false);
    setError(false); // Đặt lại trạng thái lỗi
  };

  return (
    <>
      {Loading ? (
        <LoadingAnimation />
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {!showApp ? (
            <form>
              <h1>Nhập Vị Trí</h1>
              <input
                className="input"
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                placeholder="Nhập tên thành phố hoặc địa điểm"
              />
              <button className="submit" onClick={handleSubmit}>
                Xác Nhận
              </button>
            </form>
          ) : error ? (
            // Hiển thị thông báo lỗi và nút quay lại nếu nhập sai vị trí
            <div className="error">
              <h2>Không tìm thấy vị trí "{location}"</h2>
              <p>Vui lòng kiểm tra lại hoặc nhập một vị trí khác.</p>
              <button className="submit" onClick={handleGoBack}>
                Quay lại nhập vị trí
              </button>
            </div>
          ) : weather ? (
            <div className="app">
              <video className="bgvid" src={vidbg} autoPlay loop muted></video>
              <div className="info">
                {location} {new Date(weather.dt * 1000).toLocaleString()}
                <p>Ghi chú: {getWeatherIcon(weather.weather[0].icon).note}</p>
                <p>Nhiệt Độ: {weather.main.temp}°C</p>
                <p>Độ ẩm: {weather.main.humidity}%</p>
                <p>Áp suất: {weather.main.pressure}hPa</p>
                <p>Mây: {weather.weather[0]?.description}</p>
                <p>Gió: {weather.wind.speed}m/s</p>
                <p>Hướng Gió: {windDir(weather.wind.deg)}</p>
              </div>
              <button className="submitback" onClick={handleGoBack}>
                Quay lại
              </button>
            </div>
          ) : (
            <p>Đang tải dữ liệu thời tiết...</p>
          )}
        </div>
      )}
    </>
  );
};

export default App;
