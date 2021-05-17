import React, { useEffect, useContext, useRef } from "react";
import { pixelPaintContext } from "../context/pixelPaint";
import Board from "./Board";
import styled from "styled-components";
import ColorPicker from "./ColorPicker";
import Button from "./Button";
import { game } from "../utils/game";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function PixelPaint() {
  const { state, dispatch } = useContext(pixelPaintContext);

  useEffect(() => {
    dispatch({ type: "INIT", payload: { x: 16, y: 16 } });
  }, []);

  const handleClick = () => {
    if (!state.playing) {
      dispatch({ type: "START_GAME" });
    } else {
      dispatch({ type: "STOP_GAME" });
    }
  };

  return (
    <Container
      onWheel={(e) => {
        if (e.deltaY < 0) dispatch({ type: "ZOOM_IN" });
        else dispatch({ type: "ZOOM_OUT" });
      }}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      onMouseUp={() => dispatch({ type: "SET_PAINTING", payload: false })}
    >
      <Board />
      {/* <ColorPicker
        type="color"
        onChange={(e) =>
          dispatch({ type: "SET_COLOR", payload: e.target.value })
        }
      /> */}
      <Button onClick={handleClick}>{state.playing ? "Edit" : "Start"}</Button>
    </Container>
  );
}

export default PixelPaint;
