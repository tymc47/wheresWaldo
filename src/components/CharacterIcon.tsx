import { Box, Icon } from "@mui/material";
import { characterImg } from "../assets/characterImg";
import { characterName, LevelObj } from "../types";

interface CharacterIconProps {
  level: LevelObj;
  found?: characterName[];
}
const CharacterIcon = ({ level, found }: CharacterIconProps) => {
  console.log(found);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {level.character.map((name) => (
        <Icon
          key={name}
          fontSize="large"
          sx={{ mx: "4px", opacity: found?.includes(name) ? 0.4 : 1 }}
        >
          <img src={characterImg[name]}></img>
        </Icon>
      ))}
    </Box>
  );
};

export default CharacterIcon;
