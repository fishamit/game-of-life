export const game = (arr, dispatch) => {
  const tmp = JSON.parse(JSON.stringify([...arr]));
  tmp[Math.floor(Math.random() * 255)].alive = true;
  tmp[Math.floor(Math.random() * 255)].alive = true;
  tmp[Math.floor(Math.random() * 255)].alive = true;
  dispatch({ type: "SET_ARR", payload: tmp });
};
