import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import WeatherCard from "./Weathercard/component";

const WeatherEngine = ({ location }) => {
  const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
  `;
  const inputText = React.createRef();
  const [weather, setWeather] = useState({
    temp: null,
    city: null,
    condition: null,
    country: null,
  });

  const getWeather = (q) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${q}&APPID=bea206e13b3e165bcfc398f12f23f93d`
      )
      .then((res) => {
        setWeather({
          temp: res.data.main.temp,
          city: res.data.name,
          condition: res.data.weather[0].main,
          country: res.data.sys.country,
        });
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getWeather(inputText.current.value);
  };

  useEffect(() => {
    getWeather(location);
  }, [location]);

  return (
    <Container>
      <WeatherCard
        temp={weather.temp}
        condition={weather.condition}
        city={weather.city}
        country={weather.country}
      />
      <form onSubmit={(e) => handleSearch(e)}>
        <input type="text" ref={inputText} placeholder="City, country label" />
        <input type="submit" value="Submit" />
      </form>
    </Container>
  );
};

export default WeatherEngine;
