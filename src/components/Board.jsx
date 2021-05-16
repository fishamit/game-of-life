import React, { useContext } from "react";
import { pixelPaintContext } from "../context/pixelPaint";
import Pixel from "./Pixel";
import styled from "styled-components";

const BoardContainer = styled.div`
  height: ${(props) => props.size.y * props.zoom}px;
  width: ${(props) => props.size.x * props.zoom}px;
  background-color: #1a1a1a;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0 0 10px 0;
`;

function Board() {
  const { state, dispatch } = useContext(pixelPaintContext);
  return (
    <BoardContainer
      size={state.size}
      zoom={state.zoom}
      onMouseDown={(e) => {
        e.preventDefault();
        dispatch({ type: "SET_PAINTING", payload: true });
      }}
    >
      {state.arr.map((p) => (
        <Pixel
          key={`${p.coordinates.x},${p.coordinates.y}`}
          coordinates={p.coordinates}
          color={p.color}
        />
      ))}
    </BoardContainer>
  );
}

export default Board;
