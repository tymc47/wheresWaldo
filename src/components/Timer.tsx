import { Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { convertTime } from "../utils";

interface TimerProps {
  gameStart: boolean;
  setGameTime: React.Dispatch<React.SetStateAction<number>>;
}

const Timer = ({ gameStart, setGameTime }: TimerProps) => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (gameStart) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      setGameTime(time);
    }
    return () => clearInterval(interval);
  }, [gameStart]);

  return (
    <Box sx={{ minWidth: "100px" }}>
      <Typography variant="h6">{convertTime(time)}</Typography>
    </Box>
  );
};

export default Timer;
