import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Drawer,
} from "@mui/material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/logo/logo.svg";
import Waldo_Logo from "../assets/logo/waldo-logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useScreen } from "../utils";

interface NavbarProps {
  icon: JSX.Element | null;
  timer: JSX.Element | null;
  button: JSX.Element | null;
}

const Navbar = ({ icon, timer, button }: NavbarProps) => {
  const { MScreen, SScreen, LScreen } = useScreen();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const WaldoIcon = (
    <Box
      component="img"
      sx={{
        height: 64,
      }}
      alt="logo"
      src={Waldo_Logo}
    />
  );

  const WaldoLogo = (
    <Box
      component="img"
      sx={{
        height: 64,
      }}
      alt="logo"
      src={Logo}
    />
  );

  const NavButton = (
    <Box
      sx={{
        display: "flex",
        flexDirection: MScreen ? "row" : "column",
        alignItems: "flex-start",
      }}
      onClick={() => setOpenDrawer(false)}
    >
      <Tooltip title="Home" disableHoverListener={!MScreen}>
        <IconButton color="info" component={Link} to="/">
          <HomeIcon sx={{ fontSize: 32, marginRight: MScreen ? 0 : 1 }} />
          {!MScreen && "Home"}
        </IconButton>
      </Tooltip>
      <Tooltip title="Leaderboard" disableHoverListener={!MScreen}>
        <IconButton color="info" component={Link} to="/leaderboard">
          <LeaderboardIcon
            sx={{ fontSize: 32, marginRight: MScreen ? 0 : 1 }}
          />
          {!MScreen && "LeaderBoard"}
        </IconButton>
      </Tooltip>
      <Tooltip title="About" disableHoverListener={!MScreen}>
        <IconButton
          component="a"
          target="_blank"
          href="https://en.wikipedia.org/wiki/Where's_Wally%3F"
          color="info"
        >
          <InfoIcon sx={{ fontSize: 32, marginRight: MScreen ? 0 : 1 }} />
          {!MScreen && "Info"}
        </IconButton>
      </Tooltip>
      <Tooltip title="Github" disableHoverListener={!MScreen}>
        <IconButton
          component="a"
          target="_blank"
          href="https://github.com/tymc47/whereswaldo"
          color="info"
        >
          <GitHubIcon sx={{ fontSize: 32, marginRight: MScreen ? 0 : 1 }} />
          {!MScreen && "Github"}
        </IconButton>
      </Tooltip>
    </Box>
  );

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          height: 80,
          display: "flex",
          mx: LScreen ? 8 : SScreen ? 4 : 0,
          px: SScreen ? "16px" : 0,
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          component={Link}
          to="/"
        >
          {SScreen ? WaldoIcon : timer ? null : WaldoIcon}
          {MScreen ? WaldoLogo : timer ? null : WaldoLogo}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            columnGap: LScreen ? "16px" : SScreen ? "8px" : "0px",
          }}
        >
          {icon}
          {timer}
          {button}
        </Box>

        {MScreen ? (
          NavButton
        ) : (
          <IconButton color="info" onClick={() => setOpenDrawer(true)}>
            <MenuIcon sx={{ fontSize: 32 }} />
          </IconButton>
        )}
        <Drawer
          sx={{ minWidth: "60px" }}
          anchor="right"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          {NavButton}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
