import { randomId } from "../../utils";

export const baseSessionState = {
  id: randomId("s"),
  initialized: false,
  roomId: null,
  fetchConnections: false,
  connections: [],
};
