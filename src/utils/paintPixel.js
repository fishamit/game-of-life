// export default (array, coordinates, currentColor) => {
//   const tmp = [...array];
//   const el = tmp.find(
//     (p) =>
//       p.coordinates.x === coordinates.x && p.coordinates.y === coordinates.y
//   );

//   el.alive = true;
//   return tmp;
// };

export default (array, coordinates, size) => {
  const tmp = JSON.parse(JSON.stringify([...array]));

  tmp[size.y * coordinates.y + coordinates.x].alive =
    !tmp[size.y * coordinates.y + coordinates.x].alive;

  return tmp;
};
