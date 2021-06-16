import create from "zustand";
import { devtools } from "zustand/middleware";

import socket from "../config/socket";
import { basePlayerState, baseSessionState } from "./baseStates";

const emitterStore = (set) => ({
  fetchPlayersEmitter: async (roomId) => {
    console.info("[FETCH_PLAYERS_EMIT]: fetching players in ", roomId, "...");
    await socket.emit("fetch-players", roomId, (data) => console.log(data));
  },
  createSessionEmitter: async (roomId = null) => {
    console.info("[CREATE_SESSION_EMIT]: creating room...");
    await socket.emit("create-room", roomId, (data) => {
      console.log(data);
    });
  },
  joinSessionEmitter: async (name, roomId) => {
    console.info("[JOIN_ROOM_EMIT]: ", "joining", roomId);
    await socket.emit("join-room", name, roomId, (data) => {
      console.log(data);
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
  thisPlayer: null,
  initializeSession: (roomId) => {
    set((state) => {
      console.info("[INITIALIZE_SESSION]:", true);
      return {
        session: {
          ...state.session,
          initialized: true,
          roomId: roomId || state.session.roomId,
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
  setThisPlayer: (thisPlayer) => {
    set((state) => {
      console.info("[SET_THIS_PLAYER]: ", thisPlayer);
      return {
        thisPlayer: {
          ...thisPlayer,
          ...basePlayerState,
        },
      };
    });
  },
  updateThisPlayer: ({ thisPlayer }) => {
    set((state) => {
      console.info("[UPDATE_THIS_PLAYER]: ", thisPlayer);
      return {
        thisPlayer: {
          ...thisPlayer,
          ...state.thisPlayer,
        },
      };
    });
  },
  fetchPlayerList: (players) => {
    console.info("[FETCH_PLAYERS]: ", players);
    const playerObjects = players.map((player) => {
      return {
        ...player,
        ...basePlayerState,
      };
    });
    set((state) => {
      return {
        ...state,
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
  removePlayer: (playerId) => {
    console.info("[REMOVE_PLAYER]:", playerId);
    set((state) => {
      return {
        players: state.players.filter((player) => player.id !== playerId),
      };
    });
  },
  toggleFetchFromGiphy: (bool) => {
    console.info("[TOGGLE_FETCH]: ", bool);
    set((state) => {
      return {
        session: {
          ...state.session,
          fetchFromGiphy: bool,
        },
      };
    });
  },
});

const giffyStore = (set) => ({
  giphyInstance: null,
  sessionGifs: [],
  setGiphySDK: (giffyFetch) => {
    console.log("[GIFFY_SDK]: ", giffyFetch);
    set((state) => {
      return {
        giphyInstance: giffyFetch,
      };
    });
  },
  setInitialGifs: (gifs) => {
    console.log("[INITIAL_SESSION_GIFS]: ", gifs);
    set((state) => {
      return {
        sessionGifs: [...gifs],
      };
    });
  },
  updateSessionGifs: (gif) => {
    console.log("[SESSION_GIFS]: ", gif);
    set((state) => {
      return {
        sessionGifs: [...state.sessionGifs, ...gif],
      };
    });
  },
});
export const useSessionStore = create(devtools(gameStore, "gameStore"));
export const useEmitterStore = create(devtools(emitterStore, "emitterStore"));
export const useGiffyStore = create(devtools(giffyStore, "giffyStore"));
