import React, { useContext } from "react";
import { pixelPaintContext } from "../context/pixelPaint";
import Pixel from "./Pixel";
import styled from "styled-components";

const BoardContainer = styled.div`
  height: ${(props) => props.size.y * props.zoom}px;
  width: ${(props) => props.size.x * props.zoom}px;

  display: flex;
  flex-wrap: wrap;
  box-shadow: 0 0 20px 0 #000000ff;
`;

function Board() {
  const { state, dispatch } = useContext(pixelPaintContext);
  return (
    <BoardContainer
      size={state.size}
      zoom={state.zoom}
      playing={state.playing}
      onMouseDown={(e) => {
        e.preventDefault();
        dispatch({ type: "SET_PAINTING", payload: true });
      }}
    >
      {state.arr.map((p) => (
        <Pixel
          key={`${p.coordinates.x},${p.coordinates.y}`}
          coordinates={p.coordinates}
          alive={p.alive}
        />
      ))}
    </BoardContainer>
  );
}

export default Board;
