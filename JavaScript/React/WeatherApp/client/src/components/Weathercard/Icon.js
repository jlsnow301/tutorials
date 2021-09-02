import React from "react";
import styled from "@emotion/styled";

const Icon = (props) => {
  const Icon = styled.img`
    width: 25%;
  `;

  var icon = "";
  switch (props.condition) {
    case "Clear":
      icon = `./sun.png`;
      break;
    case "Rain":
      icon = `./rain.png`;
      break;
    case "Clouds":
      icon = `./cloudy.png`;
      break;
    case "Snow":
      icon = `./snowing.png`;
      break;
    case "Wind":
      icon = `./wind.png`;
      break;
    case "Storm":
      icon = `./storm.png`;
      break;
    default:
      break;
  }

  return <Icon className="icon" src={icon} alt="Weather Icon" />;
};

export default Icon;
