import React, { useEffect, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import LevelList from "./components/LevelList";
import { Routes, Route, useMatch } from "react-router-dom";
import Playground from "./components/Playground";
import { characterName, LevelObj } from "./types";
import levelEntries from "./data";

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
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [currentLevel, setCurrentLevel] = useState<LevelObj | null>(null);
  const [characterStrike, setCharacterStrike] = useState<characterName[]>([]);
  const levels = levelEntries;
  const match = useMatch("/playground/:name");

  const startGame = () => setGameStart(true);

  const handleStrike = (name: characterName) => {
    if (characterStrike.includes(name)) return;
    const found = characterStrike.concat(name);
    if (found) setCharacterStrike(found);
    if (found && found.length === currentLevel?.character.length) {
      setGameStart(false);
    }
  };

  useEffect(() => {
    if (match) {
      const level = levels.find(
        (entry: LevelObj) => entry.name === match.params.name
      );
      if (level) {
        setCurrentLevel(level);
      }
    } else setCurrentLevel(null);
  }, [match]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <CssBaseline />
        <Navbar
          currentLevel={currentLevel}
          gameStart={gameStart}
          startGame={startGame}
          found={characterStrike}
        />
        <Routes>
          <Route
            path="/playground/:name"
            element={
              <Playground
                level={currentLevel}
                gameStart={gameStart}
                handleStrike={handleStrike}
              />
            }
          />
          <Route path="/" element={<LevelList levels={levels} />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}
export default App;
