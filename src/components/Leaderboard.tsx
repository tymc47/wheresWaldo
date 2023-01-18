import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useMatch, useNavigate } from "react-router-dom";
import { thumbnail } from "../assets/thumbnail";
import databaseService from "../services/database";
import { levelName, LevelObj, score } from "../types";
import { compareScore, useScreen } from "../utils";

const Leaderboard = ({ levels }: { levels: LevelObj[] }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<score[]>([]);
  const match = useMatch<"levelName", string>("/leaderboard/:levelName");
  const { MScreen, SScreen } = useScreen();

  useEffect(() => {
    if (!levels || levels.length === 0) navigate("/");
  }, []);

  useEffect(() => {
    if (match) {
      const levelName = match.params.levelName;
      databaseService.getLeaderboard(levelName as levelName).then((res) => {
        const sorted = [...res].sort((a, b) => compareScore(a, b));
        setData(sorted);
      });
    } else navigate(`/leaderboard/${levels[0].name}`);
  }, [match]);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        rowGap: "2vh",
        backgroundColor: "secondary.main",
        height: "100%",
        px: "5vw",
        pt: "2vw",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {levels.map((level) => (
          <Card
            key={level.name}
            sx={{
              maxWidth: "18%",
              backgroundColor:
                match?.params.levelName === level.name
                  ? "info.main"
                  : "primary",
              color:
                match?.params.levelName === level.name
                  ? "primary.main"
                  : "primary.dark",
            }}
          >
            <CardActionArea to={`/leaderboard/${level.name}`} component={Link}>
              <CardMedia
                component="img"
                height={SScreen ? "70%" : "90px"}
                image={thumbnail[level.name]}
                alt={level.name}
              />
              {SScreen && (
                <Typography
                  sx={{ ml: MScreen ? "8px" : "4px", my: "4px" }}
                  variant={MScreen ? "h6" : "subtitle2"}
                  component="div"
                >
                  {level.name.toUpperCase()}
                </Typography>
              )}
            </CardActionArea>
          </Card>
        ))}
      </Box>
      <Routes>
        <Route
          path="/:levelName"
          element={
            <TableContainer
              component={Paper}
              sx={{ maxWidth: "100%", px: "2vw" }}
            >
              <Table
                sx={MScreen ? { minWidth: 650 } : null}
                aria-label="simple table"
              >
                <colgroup>
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "35%" }} />
                  <col style={{ width: "35%" }} />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Time (mm:ss:ms)</TableCell>
                    <TableCell align="right">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data && data.length !== 0
                    ? data.map((row: score) => (
                        <TableRow
                          key={row.username}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.username}
                          </TableCell>
                          <TableCell align="right">{row.time}</TableCell>
                          <TableCell align="right">{row.date}</TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          }
        />
      </Routes>
    </Box>
  );
};

export default Leaderboard;
