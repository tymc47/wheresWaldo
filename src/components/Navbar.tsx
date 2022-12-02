import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";
import Logo from "../assets/logo/logo.svg";
import Waldo_Logo from "../assets/logo/waldo-logo.svg";
import { Link } from "react-router-dom";
import Timer from "./Timer";
import CharacterIcon from "./CharacterIcon";
import { CharacterLocation, LevelObj } from "../types";

interface NavbarProps {
  currentLevel: LevelObj | null;
  gameStart: boolean;
  found: CharacterLocation[];
  startGame: () => void;
}

const Navbar = ({ currentLevel, gameStart, startGame, found }: NavbarProps) => {
  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          height: 80,
          display: "flex",
          mx: 8,
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          component={Link}
          to="/"
        >
          <Box
            component="img"
            sx={{
              height: 64,
            }}
            alt="logo"
            src={Waldo_Logo}
          />
          <Box
            component="img"
            sx={{
              height: 64,
            }}
            alt="logo"
            src={Logo}
          />
        </Box>
        {!currentLevel ? null : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: "16px",
            }}
          >
            <CharacterIcon level={currentLevel} found={found} />
            <Timer gameStart={gameStart} />
            {gameStart ? (
              <Button color="info" variant="contained" onClick={startGame}>
                Started!
              </Button>
            ) : (
              <Button color="secondary" variant="contained" onClick={startGame}>
                Start!
              </Button>
            )}
          </Box>
        )}
        <Box>
          <Tooltip title="Home">
            <IconButton color="info" component={Link} to="/">
              <HomeIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Leaderboard">
            <IconButton color="info" component={Link} to="/leaderboard">
              <LeaderboardIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="About">
            <IconButton
              component="a"
              target="_blank"
              href="https://en.wikipedia.org/wiki/Where's_Wally%3F"
              color="info"
            >
              <InfoIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Github">
            <IconButton
              component="a"
              target="_blank"
              href="https://github.com/tymc47/whereswaldo"
              color="info"
            >
              <GitHubIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
