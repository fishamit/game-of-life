import React, { useEffect, useContext, useState } from "react";
import { pixelPaintContext } from "../context/pixelPaint";
import Board from "./Board";
import styled from "styled-components";
import ColorPicker from "./ColorPicker";
import Button from "./Button";
import Slider from "@material-ui/core/Slider";
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
  const [myTimeout, setMyTimeout] = useState(null);
  const [speed, setSpeed] = useState(500);
  useEffect(() => {
    dispatch({ type: "INIT", payload: { x: 32, y: 32 } });
  }, []);

  // useEffect(() => {
  //   console.log(state.playing);
  //   let timeOut = null;
  //   if (state.playing) {
  //     timeOut = setTimeout(() => {
  //       dispatch({ type: "TICK" });
  //     }, 1000);
  //   }
  // }, [state.playing]);

  useEffect(() => {
    if (state.playing) {
      setMyTimeout(
        setTimeout(() => {
          game(state.arr, dispatch, state.size);
        }, speed)
      );
    }
  }, [state.turn]);

  const handleClick = () => {
    if (!state.playing) {
      dispatch({ type: "START_GAME" });
      dispatch({ type: "TICK" });
    } else {
      dispatch({ type: "STOP_GAME" });
      clearTimeout(myTimeout);
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

      <Slider
        style={{ width: "100px", marginTop: "50px" }}
        min={200}
        max={2000}
        value={speed}
        onChange={(e, n) => {
          setSpeed(n);
        }}
      ></Slider>
      <Button onClick={handleClick}>{state.playing ? "Stop" : "Start"}</Button>
    </Container>
  );
}

export default PixelPaint;
