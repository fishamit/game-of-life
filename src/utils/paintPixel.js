export default (array, coordinates, currentColor) => {
  const tmp = [...array];

  tmp.find(
    (p) =>
      p.coordinates.x === coordinates.x && p.coordinates.y === coordinates.y
  ).color = currentColor;
  return tmp;
};

//paintPixel(state.arr, action.payload, state.currentColor),
