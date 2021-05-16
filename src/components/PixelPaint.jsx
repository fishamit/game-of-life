import React, { useEffect, useContext } from "react";
import { pixelPaintContext } from "../context/pixelPaint";
import Board from "./Board";
import styled from "styled-components";
import ColorPicker from "./ColorPicker";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function PixelPaint() {
  const { dispatch } = useContext(pixelPaintContext);

  useEffect(() => {
    dispatch({ type: "INIT", payload: { x: 16, y: 16 } });
  }, []);

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
      <ColorPicker
        type="color"
        onChange={(e) =>
          dispatch({ type: "SET_COLOR", payload: e.target.value })
        }
      />
    </Container>
  );
}

export default PixelPaint;
