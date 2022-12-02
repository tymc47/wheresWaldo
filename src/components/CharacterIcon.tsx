import { Box, Icon } from "@mui/material";
import { characterImg } from "../assets/characterImg";
import { CharacterLocation, LevelObj } from "../types";

interface CharacterIconProps {
  level: LevelObj;
  found?: CharacterLocation[];
}
const CharacterIcon = ({ level, found }: CharacterIconProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      {level.character.map((name) => (
        <Icon
          key={name}
          sx={{
            fontSize: "48px",
            mx: "4px",
            opacity: found?.some((location) => location.name === name)
              ? 0.4
              : 1,
          }}
        >
          <img src={characterImg[name]}></img>
        </Icon>
      ))}
    </Box>
  );
};

export default CharacterIcon;
