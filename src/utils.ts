import { coordinates } from "./types";

export const validateGuess = (
  guess: coordinates,
  location: coordinates
): boolean => {
  const deviation = 0.01;
  const leftBound = guess.X - (deviation * 2) / 3;
  const rightBound = guess.X + (deviation * 2) / 3;
  const topBound = guess.Y - deviation;
  const bottomBound = guess.Y + deviation;

  //   console.log("guess", guess);
  //   console.log("actual location", location);
  //   console.log(leftBound, rightBound, topBound, bottomBound);
  //   console.log(location.X > leftBound);
  //   console.log(location.X < rightBound);
  //   console.log(location.Y > bottomBound);
  //   console.log(location.Y < topBound);

  if (
    location.X > leftBound &&
    location.X < rightBound &&
    location.Y < bottomBound &&
    location.Y > topBound
  )
    return true;
  return false;
};
