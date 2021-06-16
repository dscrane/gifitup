import { randomId } from "../../utils";

export const baseSessionState = {
  id: randomId("S"),
  initialized: false,
  roomId: null,
  fetchFromGiphy: false,
  inGameSession: false,
  inProgress: false,
};
