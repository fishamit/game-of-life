import { createContext, useReducer } from "react";
import paintPixel from "../utils/paintPixel";
import createArray from "../utils/createArray";
export const pixelPaintContext = createContext();

const initialState = {
  arr: [],
  size: {},
  painting: false,
  currentColor: "#000000ff",
  zoom: 30,
  playing: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return {
        ...state,
        arr: createArray(action.payload),
        size: action.payload,
      };
    }
    case "PAINT_PIXEL": {
      if (state.painting)
        return {
          ...state,
          arr: paintPixel(state.arr, action.payload, state.size),
        };
      return state;
    }

    case "SET_PAINTING": {
      return { ...state, painting: action.payload };
    }

    case "ZOOM_IN": {
      return { ...state, zoom: state.zoom + 1 };
    }
    case "ZOOM_OUT": {
      return { ...state, zoom: state.zoom === 2 ? 2 : state.zoom - 1 };
    }

    case "SET_COLOR": {
      return { ...state, currentColor: action.payload };
    }
    case "START_GAME": {
      return { ...state, playing: true };
    }
    case "STOP_GAME": {
      return { ...state, playing: false };
    }
    case "SET_ARR": {
      return { ...state, arr: action.payload };
    }
    default: {
      return state;
    }
  }
};

export const PixelPaintProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <pixelPaintContext.Provider value={{ state, dispatch }}>
      {children}
    </pixelPaintContext.Provider>
  );
};
