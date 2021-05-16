import React, { useContext } from "react";
import styled from "styled-components";
import { pixelPaintContext } from "../context/pixelPaint";

const PixelStyle = styled.div`
  width: ${(props) => 100 / props.size.x}%;
  height: ${(props) => 100 / props.size.y}%;
  background-color: ${(props) => props.color};
  box-sizing: border-box;
  border: 1px solid black;
`;

function Pixel({ coordinates, color }) {
  const { state, dispatch } = useContext(pixelPaintContext);
  return (
    <PixelStyle
      onMouseDown={() => {
        dispatch({ type: "SET_PAINTING", payload: true });
        dispatch({ type: "PAINT_PIXEL", payload: coordinates });
      }}
      onMouseEnter={() => {
        dispatch({ type: "PAINT_PIXEL", payload: coordinates });
      }}
      color={color}
      size={state.size}
    />
  );
}

export default Pixel;
