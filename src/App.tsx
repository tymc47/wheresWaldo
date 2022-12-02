import React, { useEffect, useState } from "react";
import { Box, Button, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import LevelList from "./components/LevelList";
import { Routes, Route, useMatch, useNavigate } from "react-router-dom";
import Playground from "./components/Playground";
import { CharacterLocation, coordinates, LevelObj } from "./types";
import databaseService from "./services/database";
import { validateGuess } from "./utils";
import CharacterIcon from "./components/CharacterIcon";
import Timer from "./components/Timer";
import Leaderboard from "./components/Leaderboard";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fffffe",
      light: "#5f6c7b",
      dark: "#094067",
    },
    secondary: {
      main: "#d8eefe",
      light: "#5f6c7b",
      dark: "#3da9fc",
    },
    info: {
      main: "#ef3e37",
    },
  },
});

function App() {
  const navigate = useNavigate();
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [gameTime, setGameTime] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<LevelObj | null>(null);
  const [locationStrike, setLocationStrike] = useState<CharacterLocation[]>([]);
  const [levels, setLevels] = useState<LevelObj[]>([]);
  const match = useMatch<"name", string>("/playground/:name");

  const startGame = () => setGameStart(true);

  const handleStrike = (location: CharacterLocation) => {
    if (locationStrike.some((loco) => loco.name === location.name)) return;
    const found = locationStrike.concat(location);
    if (found) setLocationStrike(found);
    if (found && found.length === currentLevel?.character.length) {
      setGameStart(false);
    }
  };

  const handleGuess = async (guess: coordinates) => {
    if (!currentLevel) return;

    const locations = await databaseService.getCharacterLocations(
      currentLevel.name
    );

    if (!locations) return;

    locations.forEach((location) => {
      if (locationStrike.some((x) => x.name === location.name)) return;
      if (validateGuess(guess, location.coordinates)) handleStrike(location);
    });
  };

  useEffect(() => {
    databaseService.getlevelsData().then((data) => setLevels(data));
  }, []);

  useEffect(() => {
    if (match) {
      const level = levels.find(
        (entry: LevelObj) => entry.name === match.params.name
      );
      if (level) {
        setCurrentLevel(level);
      } else {
        navigate("/");
      }
    } else {
      setLocationStrike([]);
      setCurrentLevel(null);
      setGameTime(0);
      setGameStart(false);
    }
  }, [match]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <CssBaseline />
        <Navbar
          icon={
            currentLevel ? (
              <CharacterIcon level={currentLevel} found={locationStrike} />
            ) : null
          }
          timer={
            currentLevel ? (
              <Timer gameStart={gameStart} setGameTime={setGameTime} />
            ) : null
          }
          button={
            currentLevel ? (
              <Button
                color={gameStart ? "info" : "secondary"}
                variant="contained"
                onClick={startGame}
              >
                {gameStart ? "Started!" : "Start!"}
              </Button>
            ) : null
          }
        />
        <Routes>
          <Route
            path="/playground/:name"
            element={
              <Playground
                level={currentLevel}
                gameStart={gameStart}
                found={locationStrike}
                handleGuess={handleGuess}
                finishTime={gameTime}
              />
            }
          />
          <Route
            path="/leaderboard/*"
            element={<Leaderboard levels={levels} />}
          />
          <Route path="/" element={<LevelList levels={levels} />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}
export default App;
