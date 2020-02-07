import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import "../css/weaterApp.css";

const WeatherPage = () => {
  useEffect(() => {
    getWeather();
  }, []);

  //  useState
  const [getCityName, setCityName] = useState({
    cityName: ""
  });

  const { cityName } = getCityName;
  const [weatherData, setWeatherData] = useState(null);

  //  Function for get the weather data
  const getWeather = async () => {
    const key = "703a5d1b8d96df2e899ac0261e3afb84";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;
    try {
      const res = await axios.get(url);
      setWeatherData(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    getWeather();
  };

  const onChange = e => {
    setCityName({ ...getCityName, [e.target.name]: e.target.value });
  };

  //  Render
  return (
    <div className="weatherApp">
      <div className="weatherHeader">
        <img
          className="iconLogo"
          src={`https://www.iblsoft.com/wp-content/uploads/2019/01/IBL_logo_OnlineWeather.png`}
        />
      </div>
      <form className="searchForm" onSubmit={e => onSubmit(e)}>
        <input
          type="text"
          placeholder="Search by City"
          name="cityName"
          value={cityName}
          onChange={e => onChange(e)}
        />
        <input type="submit" value="Send" />
      </form>
      {weatherData !== null ? (
        <Fragment>
          <img
            className="Icon"
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
          />
          <div className="weatherCountry">{weatherData.name}</div>
          <div className="weathertemp">{Math.floor(weatherData.main.temp)}</div>
          <div className="Copyright">© By Mor Tsadok 2020</div>
        </Fragment>
      ) : null}
    </div>
  );
};
export default WeatherPage;
