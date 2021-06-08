import create from "zustand";
import { devtools } from "zustand/middleware";
import uniqueId from "lodash.uniqueid";
import socket from "../config/socket";
import { basePlayerState, baseSessionState } from "./baseStates";

export const useStore = create(
  devtools((set) => ({
    session: { ...baseSessionState },
    players: [],
    removePlayer: (playerId) =>
      set((state) => {
        console.info("[removePlayer]:", playerId);
        return {
          players: state.players.filter((player) => player.id !== playerId),
        };
      }),
    checkConnections: () => {
      socket.emit("check-connections", { room: socket.data.room });
    },
    connectToSocket: () => {},
    createRoom: () => {},
    joinRoom: (playerName) => {
      console.info("[addPlayer]:", playerName);
      socket.emit("join-room", playerName, (response) =>
        console.log("newPlayer", response)
      );
      set((state) => {
        return {
          players: [
            ...state.players,
            { ...basePlayerState, id: uniqueId("p_"), name: playerName },
          ],
        };
      });
    },
    initializeSession: () =>
      set((state) => {
        console.info("[initializeSession]:", true);
        return {
          session: {
            ...state.session,
            initialized: true,
          },
        };
      }),
    updateSocket: (socketInstance) =>
      set((state) => {
        console.info("[updateSocket]: ", socketInstance);
        return {
          session: {
            ...state.session,
            socketIO: socketInstance.io,
            config: { socket: { ...socketInstance } },
          },
        };
      }),
    updateSessionData: (newSessionData) =>
      set((state) => {
        console.info("[updateSessionData]: ", newSessionData);
        return {
          session: {
            ...state.session,
            config: { ...newSessionData, ...state.session.config },
          },
        };
      }),
  }))
);

socket.on("connect", () => console.log("connect", socket.id));

socket.on("initial-connection", ({ data }) => {
  console.log("SOCKET", data);
});

socket.on("joined-room", ({ data }) => console.log("joinedRoom", data));
socket.on("update-connections", (data) => console.log("new-connect", data));
