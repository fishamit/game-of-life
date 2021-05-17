import React, { useContext, useState } from "react";
import styled from "styled-components";
import { pixelPaintContext } from "../context/pixelPaint";

const PixelStyle = styled.div`
  width: ${(props) => 100 / props.size.x}%;
  height: ${(props) => 100 / props.size.y}%;
  background-color: ${(props) => (props.alive ? "#000" : "white")};
  box-sizing: border-box;
  border: 1px solid black;

  :hover {
    /* transform: ${(props) => (props.playing ? "none" : "scale(1.2)")}; */
    /* border: ${(props) =>
      props.alive ? "2px solid teal" : "2px solid black"}; */
    /* box-shadow: ${(props) =>
      props.playing ? "none" : "0 0 20px 0 #00000099"}; */
    border: ${(props) =>
      props.playing ? "1px solid black" : "2px solid blue"};
  }
`;

function Pixel({ coordinates, alive }) {
  const { state, dispatch } = useContext(pixelPaintContext);

  return (
    <PixelStyle
      onMouseDown={() => {
        if (!state.playing) {
          dispatch({ type: "SET_PAINTING", payload: true });
          dispatch({ type: "PAINT_PIXEL", payload: coordinates });
        }
      }}
      onMouseEnter={() => {
        if (!state.playing) {
          dispatch({ type: "PAINT_PIXEL", payload: coordinates });
        }
      }}
      playing={state.playing}
      alive={alive}
      size={state.size}
    />
  );
}

export default Pixel;
