import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";

const Timer = ({ gameStart }: { gameStart: boolean }) => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (gameStart) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [gameStart]);

  return (
    <Box sx={{ minWidth: "100px" }}>
      <Typography variant="h6">
        {`${("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
        ${("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
        ${("0" + ((time / 10) % 100)).slice(-2)}`}
      </Typography>
    </Box>
  );
};

export default Timer;
