import create from "zustand";
import { devtools } from "zustand/middleware";

import socket from "../config/socket";
import { basePlayerState, baseSessionState } from "./baseStates";
import { randomId } from "../utils";

export const useStore = create(
  devtools((set) => ({
    session: { ...baseSessionState },
    players: [],
    initializeSession: () => {
      set((state) => {
        console.info("[initializeSession]:", true);
        return {
          session: {
            ...state.session,
            initialized: true,
          },
        };
      });
    },
    createSessionRoom: async (playerName) => {
      console.info("[createRoom]: adding player...", playerName);
      await socket.emit("create-room", playerName, (data) => {
        console.log("[createRoom]: ", data);
      });
    },
    updateSession: (updates) => {
      console.info("[updateSession]: ", updates);
      set((state) => {
        return {
          session: {
            ...state.session,
            ...updates,
          },
        };
      });
    },
    joinSessionRoom: async (playerName, roomName) => {
      console.info("[joinRoom]: ", playerName);
      await socket.emit("join-room", playerName, roomName, (data) => {
        console.log("[joinRoom]: ", data);
      });
    },
    removePlayer: (playerId) => {
      console.info("[removePlayer]:", playerId);
      set((state) => {
        return {
          players: state.players.filter((player) => player.id !== playerId),
        };
      });
    },
    updateCurrentPlayers: ({ playerNames }) => {
      console.info("[updateCurrentPlayers]: ", playerNames);
      const updatedPlayerObjects = playerNames.map((playerName) => {
        return { id: randomId("p"), playerName, ...basePlayerState };
      });
      set((state) => {
        return {
          players: [...updatedPlayerObjects],
        };
      });
    },

    // updateSocket: (socketInstance) =>
    //   set((state) => {
    //     console.info("[updateSocket]: ", socketInstance);
    //     return {
    //       session: {
    //         ...state.session,
    //         socketIO: socketInstance.io,
    //         config: { socket: { ...socketInstance } },
    //       },
    //     };
    //   }),
    // updateSessionData: (newSessionData) =>
    //   set((state) => {
    //     console.info("[updateSessionData]: ", newSessionData);
    //     return {
    //       session: {
    //         ...state.session,
    //         config: { ...newSessionData, ...state.session.config },
    //       },
    //     };
    //   }),
  }))
);
