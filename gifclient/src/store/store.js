import create from "zustand";
import { devtools } from "zustand/middleware";
import produce from "immer";

import { basePlayerState } from "./baseStates/basePlayerState";

export const useSession = create(
  devtools((set) => ({
    session: { initialized: false },
    initializeSession: () =>
      set((state) => ({
        session: {
          initialized: true,
        },
      })),
    updateSession: (newSessionData) =>
      set((state) => {
        console.log(newSessionData);
        return {
          session: {
            ...newSessionData,
            ...state.session,
          },
        };
      }),
  }))
);

export const usePlayers = create(
  devtools((set) => ({
    players: [],
    addPlayer: (player) =>
      set((state) => ({
        players: [{ ...basePlayerState, ...player }, ...state.players],
      })),
    removePlayer: (playerId) =>
      set((state) => ({
        players: state.players.filter((player) => player.id !== playerId),
      })),
    set: (fn) => set(produce(fn)),
  }))
);
