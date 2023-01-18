import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  DialogContentText,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { playgroundImg } from "../assets/playgroundImg";
import { CharacterLocation, coordinates, LevelObj } from "../types";
import { convertTime, getDate, useScreen } from "../utils";
import Filter from "bad-words";
import databaseService from "../services/database";

interface PlaygroundProps {
  level: LevelObj | null;
  gameStart: boolean;
  handleGuess: (guess: coordinates) => void;
  found: CharacterLocation[];
  finishTime: number;
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
  finishTime,
}: PlaygroundProps) => {
  const [username, setUsername] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const nameFilter = new Filter();
  const navigate = useNavigate();
  const { LScreen } = useScreen();

  const [windowChange, setWindowChange] = useState<boolean>(false);
  const [playgroundXY, setPlaygroundXY] = useState<coordinates>({ X: 0, Y: 0 });
  const [playgroundSize, setPlaygroundSize] = useState<imageSize>({
    width: 0,
    height: 0,
  });
  const imgDivRef = useRef<HTMLDivElement>(null);
  const playgroundRef = useCallback(
    (node: HTMLImageElement) => {
      if (node !== null) {
        const { x, y, height, width } = node.getBoundingClientRect();
        setPlaygroundXY({
          X: x,
          Y: y,
        });
        setPlaygroundSize({
          height,
          width,
        });
      }
    },
    [windowChange, gameStart]
  );

  const handleSubmit = () => {
    if (nameFilter.isProfane(username))
      return setErrMsg("Name contains bad words");
    if (username.length < 1) return setErrMsg("Name cannot be empty");
    if (!level) return setErrMsg("Network Error, please try again later");

    const newScore = {
      username: username,
      time: convertTime(finishTime),
      date: getDate(),
    };

    databaseService.addScore(level.name, newScore);
    navigate(`/leaderboard/${level.name}`);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowChange((prev) => !prev);
    });
    window.addEventListener("scroll", () => {
      setWindowChange((prev) => !prev);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWindowChange((prev) => !prev);
      });
      window.removeEventListener("scroll", () => {
        setWindowChange((prev) => !prev);
      });
    };
  }, []);

  useEffect(() => {
    if (imgDivRef.current) {
      imgDivRef.current.addEventListener("scroll", () => {
        setWindowChange((prev) => !prev);
      });
    }

    return () => {
      imgDivRef.current?.removeEventListener("scroll", () => {
        setWindowChange((prev) => !prev);
      });
    };
  }, [imgDivRef.current]);

  if (!level) return <div>404 Level Not Found</div>;

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!gameStart) return;

    const guess: coordinates = {
      X: (event.clientX - playgroundXY.X) / playgroundSize.width,
      Y: (event.clientY - playgroundXY.Y) / playgroundSize.height,
    };
    handleGuess(guess);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "5vh 2vw 1vh 2vw",
        flex: 1,
        overflow: "hidden",
        filter: gameStart ? "" : "blur(3px)",
      }}
    >
      <Dialog
        open={
          finishTime !== 0 &&
          !gameStart &&
          level.character.length === found.length
        }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`You finished in ${convertTime(finishTime)} !`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Submit your name here to save your score on the leaderboard.
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Your Name"
            value={username}
            onChange={(e) => {
              setUsername(e.currentTarget.value);
              setErrMsg("");
            }}
            type="text"
            fullWidth
            variant="standard"
            error={errMsg !== ""}
            helperText={errMsg !== "" ? errMsg : ""}
          />
        </DialogContent>
        <DialogActions sx={{ columnGap: "8px" }}>
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Return Home
          </Button>
          <Button
            color="info"
            variant="contained"
            onClick={handleSubmit}
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Box ref={imgDivRef} sx={{ overflow: "scroll", position: "relative" }}>
        <img
          ref={playgroundRef}
          src={playgroundImg[level.name]}
          onClick={handleClick}
          style={{
            maxHeight: LScreen ? "1200px" : "900px",
            width: LScreen ? "100%" : "auto",
            cursor: "crosshair",
          }}
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
                  zIndex: 1,

                  top: `${
                    location.coordinates.Y * playgroundSize.height -
                    (playgroundSize.height * 0.02) / 2
                  }px`,
                  left: `${
                    location.coordinates.X * playgroundSize.width -
                    (playgroundSize.height * 0.02) / 2
                  }px`,
                }}
              />
            ))}
      </Box>
    </Box>
  );
};

export default Playground;
