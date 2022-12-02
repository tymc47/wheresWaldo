import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { CharacterLocation, levelName, LevelObj, score } from "../types";
import { db } from "./firebase";

const getlevelsData = async (): Promise<LevelObj[]> => {
  const result: LevelObj[] = [];
  const snapShot = await getDocs(collection(db, "levelsData"));
  snapShot.forEach((doc) => {
    const name = doc.data().name;
    const character = doc.data().character;
    result.push({
      name,
      character,
    });
  });

  return result;
};

const getCharacterLocations = async (
  levelName: levelName
): Promise<CharacterLocation[]> => {
  let locations: CharacterLocation[] = [];
  const q = query(collection(db, "levelsData"), where("name", "==", levelName));
  const snapShot = await getDocs(q);
  snapShot.forEach((doc) => {
    locations = doc.data().solution;
  });

  return locations;
};

const getLeaderboard = async (levelName: levelName): Promise<score[]> => {
  let result: score[] = [];
  const snapShot = await getDoc(doc(db, "leaderboard", levelName));
  if (snapShot.exists()) result = snapShot.data().scores;
  return result || [];
};

const addScore = async (levelName: levelName, newScore: score) => {
  const ref = doc(db, "leaderboard", levelName);
  await updateDoc(ref, {
    scores: arrayUnion(newScore),
  });
};

const databaseService = {
  getlevelsData,
  getCharacterLocations,
  getLeaderboard,
  addScore,
};

export default databaseService;
