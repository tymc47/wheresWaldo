import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Grid,
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
        height: "12vh",
        borderRadius: 50,
        ":hover": { boxShadow: 15 },
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          alignItems: "center",
          width: "70vw",
          height: "12vh",
        }}
        to={`/playground/${level.name}`}
        component={Link}
      >
        <Grid container sx={{ maxHeight: "12vh" }} alignItems="center">
          <Grid
            item
            lg={3}
            md={3}
            xs={3}
            alignItems="center"
            sx={{ pl: "2vw" }}
          >
            <Box sx={{ marginRight: "5vw" }}>
              <Typography variant="h6">{level.name.toUpperCase()}</Typography>
            </Box>
          </Grid>
          <Grid item lg={4} md={5} xs={5} sx={{ pr: "16px" }}>
            <CharacterIcon level={level} />
          </Grid>
          <Grid item lg={5} md={4} xs={4}>
            <CardMedia
              component="img"
              image={thumbnail[level.name]}
              alt={level.name}
              sx={{
                height: "12vh",
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default LevelCard;
