import { Box, AppBar, Toolbar, IconButton, Tooltip } from "@mui/material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import InfoIcon from "@mui/icons-material/Info";
import GitHubIcon from "@mui/icons-material/GitHub";
import Logo from "../assets/logo/logo.svg";
import Waldo_Logo from "../assets/logo/waldo-logo.svg";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          height: 80,
          display: "flex",
          mx: 8,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
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
        <Box>
          <Tooltip title="Leaderboard">
            <IconButton>
              <LeaderboardIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="How to Play">
            <IconButton>
              <InfoIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Github">
            <IconButton>
              <GitHubIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
