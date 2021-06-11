import create from "zustand";
import { devtools } from "zustand/middleware";

import socket from "../config/socket";
import { basePlayerState, baseSessionState } from "./baseStates";

const emitterStore = (set) => ({
  createSessionEmitter: async (playerName) => {
    console.info("[CREATE_SESSION_EMIT]: adding player...", playerName);
    await socket.emit("create-room", playerName, (data) => {
      console.log("[CREATE_SESSION_ACK]: ", data);
    });
  },
  joinSessionEmitter: async (playerName, roomName) => {
    console.info("[JOIN_ROOM_EMIT]: ", playerName, "joining", roomName);
    await socket.emit("join-room", playerName, roomName, (data) => {
      console.log("[JOIN_ROOM_ACK]: ", data);
    });
  },
  updateSessionEmitter: async () => {},
  beginGameEmitter: async () => {
    console.info("[BEGIN_GAME_ACK]: setting session to inProgress = true");
    await socket.emit("begin-game", true, (data) => {
      console.log("[BEGIN_GAME_ACK]: ", data);
    });
  },
  disconnectSessionEmitter: async (playerName, roomName) => {
    console.log("[LEAVE_ROOM_EMIT]: ", playerName, "leaving", roomName);
    await socket.emit("disconnect", playerName, roomName, (data) => {
      console.log("[LEAVE_ROOM_ACK]: ", data);
    });
  },
  endSessionEmitter: async (roomName) => {
    console.log("[END_SESSION_EMIT]: ", roomName, "session is ending");
    await socket.emit("end-session", roomName);
  },
});

const gameStore = (set) => ({
  session: { ...baseSessionState },
  players: [],
  initializeSession: () => {
    set((state) => {
      console.info("[INITIALIZE_SESSION]:", true);
      return {
        session: {
          ...state.session,
          initialized: true,
        },
      };
    });
  },
  updateSession: (updates) => {
    console.info("[UPDATE_SESSION]: ", updates);
    set((state) => {
      return {
        session: {
          ...state.session,
          ...updates,
        },
      };
    });
  },
  removePlayer: (playerId) => {
    console.info("[REMOVE_PLAYER]:", playerId);
    set((state) => {
      return {
        players: state.players.filter((player) => player.id !== playerId),
      };
    });
  },
  fetchPlayerList: (players) => {
    console.info("[FETCH_PLAYERS]: ", players);
    const playerObjects = players.map((player) => ({
      ...player,
      ...basePlayerState,
    }));
    set((state) => {
      return {
        players: [...state.players, ...playerObjects],
      };
    });
  },
  updatePlayerList: (players) => {
    console.info("[UPDATE_PLAYER]: ", players);
    set((state) => {
      return {
        players: [...players],
      };
    });
  },
});

export const useGameStore = create(devtools(gameStore, "gameStore"));
export const useEmitterStore = create(devtools(emitterStore, "emitterStore"));
