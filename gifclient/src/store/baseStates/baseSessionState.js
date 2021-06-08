import uniqueId from "lodash.uniqueid";

export const baseSessionState = {
  id: uniqueId("s_"),
  initialized: false,
  roomId: null,
  connections: [],
};
