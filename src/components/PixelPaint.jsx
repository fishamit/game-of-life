import React, { useEffect, useContext, useState } from "react";
import { pixelPaintContext } from "../context/pixelPaint";
import Board from "./Board";
import styled from "styled-components";
import ColorPicker from "./ColorPicker";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import { game } from "../utils/game";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

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
  const [speed, setSpeed] = useState(350);
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
      <h1
        style={{
          marginBottom: "50px",
          color: "white",
        }}
      >
        Conway's game of life
      </h1>
      <Board />
      <p
        style={{
          color: "white",
          width: "100px",
          marginTop: "50px",
          marginBottom: "0",
          textAlign: "center",
        }}
      >
        Frame time
      </p>
      <Slider
        min={100}
        max={1000}
        style={{ width: "100px" }}
        value={speed}
        onChange={(e, n) => {
          setSpeed(n);
        }}
      ></Slider>
      <Box marginTop={3}>
        <Button
          variant="contained"
          color={state.playing ? "secondary" : "primary"}
          onClick={handleClick}
          style={{ width: "100px" }}
        >
          {state.playing ? "Stop" : "Start"}
        </Button>
      </Box>

      <Box marginTop={3}>
        <Link
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          target="_blank"
        >
          Read more
        </Link>
      </Box>
      <p
        style={{
          color: "white",

          marginTop: "50px",
          marginBottom: "0",
          textAlign: "center",
        }}
      >
        By Amit Fisher
      </p>
    </Container>
  );
}

export default PixelPaint;
