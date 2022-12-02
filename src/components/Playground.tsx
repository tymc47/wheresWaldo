import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { playgroundImg } from "../assets/playgroundImg";
import { CharacterLocation, coordinates, LevelObj } from "../types";

interface PlaygroundProps {
  level: LevelObj | null;
  gameStart: boolean;
  handleGuess: (guess: coordinates) => void;
  found: CharacterLocation[];
}

interface imageSize {
  height: number;
  width: number;
}

const Playground = ({
  level,
  gameStart,
  handleGuess,
  found,
}: PlaygroundProps) => {
  const [windowChange, setWindowChange] = useState<boolean>(false);
  const [playgroundXY, setPlaygroundXY] = useState<coordinates>({ X: 0, Y: 0 });
  const [playgroundSize, setPlaygroundSize] = useState<imageSize>({
    width: 0,
    height: 0,
  });
  const playgroundRef = useCallback(
    (node: HTMLImageElement) => {
      if (node !== null) {
        const { x, y, height, width } = node.getBoundingClientRect();
        setPlaygroundXY({ X: x, Y: y });
        setPlaygroundSize({
          height,
          width,
        });
      }
    },
    [windowChange, gameStart]
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowChange((prev) => !prev);
    });
    window.addEventListener("scroll", () => {
      setWindowChange((prev) => !prev);
    });
  }, []);

  if (!level) return <div>404 Level Not Found</div>;

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!gameStart) return;
    const guess: coordinates = {
      X: (event.clientX - playgroundXY.X) / playgroundSize.width,
      Y: (event.clientY - playgroundXY.Y) / playgroundSize.height,
    };
    console.log(guess);
    handleGuess(guess);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        pt: "5vh",
        filter: gameStart ? "" : "blur(3px)",
      }}
    >
      <Box
        ref={playgroundRef}
        component="img"
        src={playgroundImg[level.name]}
        sx={{
          width: "90%",
          boxShadow: 10,
          cursor: "crosshair",
          position: "relative",
        }}
        onClick={handleClick}
      />
      {found.length === 0
        ? null
        : found.map((location) => (
            <Box
              key={location.name}
              sx={{
                border: "3px solid #ef3e37",
                width: `${playgroundSize.height * 0.02}px`,
                height: `${playgroundSize.height * 0.02}px`,
                position: "absolute",
                top: `${
                  playgroundXY.Y +
                  window.scrollY +
                  location.coordinates.Y * playgroundSize.height -
                  (playgroundSize.height * 0.02) / 2
                }px`,
                left: `${
                  playgroundXY.X +
                  window.scrollX +
                  location.coordinates.X * playgroundSize.width -
                  (playgroundSize.height * 0.02) / 2
                }px`,
              }}
            />
          ))}
    </Box>
  );
};

export default Playground;
