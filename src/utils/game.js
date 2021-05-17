export const game = (arr, dispatch, size) => {
  const tmp = JSON.parse(JSON.stringify([...arr]));
  const newArr = [];
  const width = size.x;
  const height = size.y;

  tmp.forEach((cell) => {
    let livingNeighbors = 0;
    const right = height * cell.coordinates.y + cell.coordinates.x + 1;
    const left = height * cell.coordinates.y + cell.coordinates.x - 1;
    const top = height * (cell.coordinates.y - 1) + cell.coordinates.x;
    const bottom = height * (cell.coordinates.y + 1) + cell.coordinates.x;
    const tRight = height * (cell.coordinates.y - 1) + cell.coordinates.x + 1;
    const bRight = height * (cell.coordinates.y + 1) + cell.coordinates.x + 1;
    const tLeft = height * (cell.coordinates.y - 1) + cell.coordinates.x - 1;
    const bLeft = height * (cell.coordinates.y + 1) + cell.coordinates.x - 1;

    if (cell.coordinates.x > 0) {
      if (tmp[left].alive) livingNeighbors++;
      if (cell.coordinates.y > 0) {
        if (tmp[tLeft].alive) livingNeighbors++;
      }
      if (cell.coordinates.y < height - 1) {
        if (tmp[bLeft].alive) livingNeighbors++;
      }
    }
    if (cell.coordinates.x < width - 1) {
      if (tmp[right].alive) livingNeighbors++;
      if (cell.coordinates.y > 0) {
        if (tmp[tRight].alive) livingNeighbors++;
      }
      if (cell.coordinates.y < height - 1) {
        if (tmp[bRight].alive) livingNeighbors++;
      }
    }
    if (cell.coordinates.y > 0) {
      if (tmp[top].alive) livingNeighbors++;
    }
    if (cell.coordinates.y < height - 1) {
      if (tmp[bottom].alive) livingNeighbors++;
    }

    if (cell.alive) {
      if (livingNeighbors < 2 || livingNeighbors > 3)
        newArr.push({ ...cell, alive: false });
      else newArr.push({ ...cell, alive: true });
    } else {
      if (livingNeighbors === 3) newArr.push({ ...cell, alive: true });
      else newArr.push({ ...cell, alive: false });
    }
  });
  dispatch({ type: "SET_ARR", payload: newArr });
};
