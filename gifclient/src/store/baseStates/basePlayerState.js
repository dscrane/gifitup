import uniqueId from "lodash.uniqueid";

export const basePlayerState = {
  id: uniqueId("player_"),
  score: 0,
  isJudge: false,

}