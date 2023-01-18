import { useMediaQuery } from "@mui/material";
import { coordinates, score } from "./types";

export const validateGuess = (
  guess: coordinates,
  location: coordinates
): boolean => {
  const deviation = 0.01;
  const leftBound = guess.X - (deviation * 2) / 3;
  const rightBound = guess.X + (deviation * 2) / 3;
  const topBound = guess.Y - deviation;
  const bottomBound = guess.Y + deviation;

  if (
    location.X > leftBound &&
    location.X < rightBound &&
    location.Y < bottomBound &&
    location.Y > topBound
  )
    return true;
  return false;
};

export const convertTime = (time: number): string => {
  return `${("0" + Math.floor((time / 60000) % 60)).slice(-2)}:${(
    "0" + Math.floor((time / 1000) % 60)
  ).slice(-2)}:${("0" + ((time / 10) % 100)).slice(-2)}`;
};

export const getDate = (): string => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return yyyy + "-" + mm + "-" + dd;
};

export const compareScore = (a: score, b: score): number => {
  if (a.time > b.time) return 1;
  else if (a.time < b.time) return -1;
  else return 0;
};

export const useScreen = () => {
  const LScreen = useMediaQuery("(min-width:1200px)");
  const MScreen = useMediaQuery("(min-width:900px)");
  const SScreen = useMediaQuery("(min-width:600px)");

  return {
    LScreen,
    MScreen,
    SScreen,
  };
};
