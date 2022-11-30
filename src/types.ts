export type levelName = "beach" | "hollywood" | "track" | "snow" | "space";
export type characterName = "waldo" | "wilma" | "woof" | "odlaw" | "wizard";

export interface LevelObj {
  name: levelName;
  character: characterName[];
}
