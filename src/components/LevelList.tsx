import { Box } from "@mui/material";
import levelEntries from "../data";
import LevelCard from "./LevelCard";

const LevelList = () => {
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
      {levelEntries.map((level) => (
        <LevelCard level={level} key={level.name} />
      ))}
    </Box>
  );
};

export default LevelList;
