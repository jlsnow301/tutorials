import React from "react";
import styled from "@emotion/styled";

const Condition = ({ temp, condition }) => {
  const Temp = styled.h1`
    font-family: "Fira Sans", sans-serif;
    font-size: 1.5rem;
    font-weight: 200;
  `;
  const State = styled.h1`
    font-family: "Merriweather", sans-serif;
    font-size: 1.2rem;
  `;

  const tempInFahrenheit = (((temp - 273.15) * 9) / 5 + 32).toFixed(2);

  return (
    <>
      <Temp>{tempInFahrenheit} °F</Temp>
      <State>{condition}</State>
    </>
  );
};

export default Condition;
