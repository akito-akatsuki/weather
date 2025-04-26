const getWeatherIcon = (iconCode) => {
  const iconMap = {
    "01d": { note: "Trời nắng rõ, không có mây." },
    "01n": { note: "Trời quang ban đêm, không có mây." },
    "02d": { note: "Một ít mây, nhưng vẫn có nắng." },
    "02n": { note: "Một ít mây vào ban đêm." },
    "03d": { note: "Mây rải rác, trời không quá nắng." },
    "03n": { note: "Mây rải rác vào buổi tối." },
    "04d": { note: "Trời âm u, mây dày đặc." },
    "04n": { note: "Trời nhiều mây vào ban đêm." },
    "09d": { note: "Có mưa nhỏ." },
    "09n": { note: "Có mưa vào ban đêm." },
    "10d": { note: "Mưa lớn, có thể có giông." },
    "10n": { note: "Mưa lớn vào ban đêm." },
    "11d": { note: "Có sấm chớp, giông bão mạnh." },
    "11n": { note: "Giông bão vào ban đêm." },
    // "13d": { image: "snow.gif", note: "Có tuyết rơi, trời lạnh." },
    // "13n": { image: "snow.gif", note: "Tuyết rơi vào ban đêm." },
    "50d": { note: "Trời nhiều sương mù, tầm nhìn hạn chế." },
    "50n": { note: "Sương mù vào ban đêm." },
  };
  return (
    iconMap[iconCode] || {
      image: "default.png",
      note: "Không xác định thời tiết.",
    }
  );
};
export default getWeatherIcon;
