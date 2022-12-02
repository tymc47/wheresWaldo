import { Box } from "@mui/material";
import { LevelObj } from "../types";
import LevelCard from "./LevelCard";

const LevelList = ({ levels }: { levels: LevelObj[] }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "24px",
        alignItems: "center",
        pt: "5vh",
        height: "100%",
        backgroundColor: "secondary.main",
      }}
    >
      {[...levels]
        .sort((a, b) => a.character.length - b.character.length)
        .map((level) => (
          <LevelCard level={level} key={level.name} />
        ))}
    </Box>
  );
};

export default LevelList;
