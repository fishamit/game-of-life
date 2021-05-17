export default (size) => {
  const tmp = [];
  for (let y = 0; y < size.y; y++) {
    for (let x = 0; x < size.x; x++) {
      tmp.push({
        coordinates: { x, y },
        alive: false,
      });
    }
  }
  return tmp;
};
