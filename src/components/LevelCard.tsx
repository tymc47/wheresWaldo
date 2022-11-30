import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import { LevelObj } from "../types";
import { Link } from "react-router-dom";
import { thumbnail } from "../assets/thumbnail";
import CharacterIcon from "./CharacterIcon";

interface LevelProps {
  level: LevelObj;
}

const LevelCard = ({ level }: LevelProps) => {
  return (
    <Card
      sx={{
        width: "70vw",
        height: "10vh",
        borderRadius: 50,
        ":hover": { boxShadow: 15 },
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          alignItems: "center",
          width: "70vw",
          pl: "40px",
          height: "10vh",
        }}
        to={`/playground/${level.name}`}
        component={Link}
      >
        <Box sx={{ flex: 1, marginRight: "5vw" }}>
          <Typography variant="h6">{level.name.toUpperCase()}</Typography>
        </Box>
        <CharacterIcon level={level} />
        <CardMedia
          component="img"
          image={thumbnail[level.name]}
          alt={level.name}
          sx={{ width: "50%", objectFit: "contain", ml: "2vw" }}
        />
      </CardActionArea>
    </Card>
  );
};

export default LevelCard;
