import { Box, Card, CardMedia, Icon, Typography } from "@mui/material";
import { LevelObj } from "../types";
import { characterIcon } from "../assets/CharacterIcon";
import { thumbnail } from "../assets/Thumbnail";

interface LevelProps {
  level: LevelObj;
}

const LevelCard = ({ level }: LevelProps) => {
  return (
    <Card
      sx={{
        display: "flex",
        width: "70vw",
        height: "10vh",
        alignItems: "center",
        pl: "3vw",
        borderRadius: 50,
        ":hover": { boxShadow: 15 },
      }}
    >
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: "24px",
        }}
      > */}
      <Box sx={{ flex: 1, marginRight: "5vw" }}>
        <Typography variant="h6">{level.name.toUpperCase()}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginRight: "2vw",
        }}
      >
        {level.character.map((name) => (
          <Icon key={name} fontSize="large" sx={{ mx: "4px" }}>
            <img src={characterIcon[name]}></img>
          </Icon>
        ))}
      </Box>
      <CardMedia
        component="img"
        image={thumbnail[level.name]}
        alt={level.name}
        sx={{ width: "50%", objectFit: "contain" }}
      />
      {/* </Box> */}
    </Card>
  );
};

export default LevelCard;
