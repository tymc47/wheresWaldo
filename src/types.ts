export type levelName = "beach" | "hollywood" | "track" | "snow" | "space";
export type characterName = "waldo" | "wilma" | "woof" | "odlaw" | "wizard";

export interface LevelObj {
  name: levelName;
  character: characterName[];
}

export interface coordinates {
  X: number;
  Y: number;
}

export interface CharacterLocation {
  name: characterName;
  coordinates: coordinates;
}

export interface score {
  username: string;
  time: string;
  date: string;
}
