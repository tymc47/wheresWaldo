import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import LevelList from "./components/LevelList";

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
      dark: "#094067",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <CssBaseline />
        <Navbar />
        <LevelList />
      </Box>
    </ThemeProvider>
  );
}
export default App;
