import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { playgroundImg } from "../assets/playgroundImg";
import { characterName, LevelObj } from "../types";

interface PlaygroundProps {
  level: LevelObj | null;
  gameStart: boolean;
  handleStrike: (name: characterName) => void;
}

const Playground = ({ level, gameStart, handleStrike }: PlaygroundProps) => {
  const playgroundRef = useRef<HTMLDivElement>(null);
  const [playgroundX, setPlaygroundX] = useState<number | undefined>();
  const [playgroundY, setPlaygroundY] = useState<number | undefined>();

  const getPosition = () => {
    const x = playgroundRef.current?.offsetLeft;
    const y = playgroundRef.current?.offsetTop;

    setPlaygroundX(x);
    setPlaygroundY(y);
  };

  const mockBackend = (
    clickX: number,
    clickY: number
  ): characterName | undefined => {
    if (clickX && clickY) return "wizard";

    return undefined;
  };

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!gameStart) return;
    const [clickX, clickY] = [event.clientX, event.clientY];
    const result = mockBackend(clickX, clickY);

    if (result) {
      handleStrike(result);
    }
  };

  useEffect(() => {
    getPosition();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", getPosition);
  }, []);

  console.log(playgroundX, playgroundY);

  if (!level) return <div>404 Level Not Found</div>;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        pt: "5vh",
      }}
    >
      <Box
        ref={playgroundRef}
        component="img"
        src={playgroundImg[level.name]}
        sx={{
          width: "90%",
          boxShadow: 10,
          filter: gameStart ? "" : "",
        }}
        onClick={handleClick}
      />
    </Box>
  );
};

export default Playground;
