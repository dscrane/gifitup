import create from "zustand";
import { devtools } from "zustand/middleware";
import produce from "immer";

import {
  basePlayerState,
  baseSessionState,
} from "./baseStates/basePlayerState";

export const useSession = create(
  devtools((set) => ({
    session: { ...baseSessionState },
    initializeSession: () =>
      set((state) => ({
        session: {
          initialized: true,
        },
      })),
    updateSocket: (socketInstance) =>
      set((state) => {
        console.info("[UpdateSocket]: ", socketInstance);
        return {
          session: {
            socketIO: socketInstance.io,
            config: { socket: { ...socketInstance } },
            ...state.session,
          },
        };
      }),
    updateSessionData: (newSessionData) =>
      set((state) => {
        console.info("[UpdateSessionData]: ", newSessionData);
        return {
          session: {
            config: { ...newSessionData, ...state.session.config },
            ...state.session,
          },
        };
      }),
  }))
);

export const usePlayers = create(
  devtools((set) => ({
    players: [],
    addPlayer: (playerName) =>
      set((state) => {
        console.info("[addPlayer]:", playerName);
        return {
          players: [{ ...basePlayerState, name: playerName }, ...state.players],
        };
      }),
    removePlayer: (playerId) =>
      set((state) => {
        return {
          players: state.players.filter((player) => player.id !== playerId),
        };
      }),
  }))
);
