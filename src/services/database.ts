import { collection, getDocs, query, where } from "firebase/firestore";
import { CharacterLocation, levelName, LevelObj } from "../types";
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

const databaseService = { getlevelsData, getCharacterLocations };

export default databaseService;
