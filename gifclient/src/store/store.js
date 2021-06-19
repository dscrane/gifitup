import create from "zustand";
import { devtools } from "zustand/middleware";

import socket from "../config/socket";
import { basePlayerState, baseSessionState } from "./baseStates";

const emitterStore = (set) => ({
  fetchPlayersEmitter: async (roomId) => {
    console.info("[IO_em]: fetching players in... ", roomId);
    await socket.emit("fetch-players", roomId, (data) => console.log(data));
  },
  createSessionEmitter: async (roomId) => {
    console.info("[IO_em]: creating session... ", roomId || "initially");
    await socket.emit("create-room", roomId);
  },
  joinSessionEmitter: async (name, roomId) => {
    console.info("[IO_em]: joining room... ", roomId);
    await socket.emit("join-room", name, roomId);
  },
  gifToTableEmitter: async (gifId) => {
    console.log("[IO_em]: moving gif...", gifId);
    await socket.emit("new-table-gif", gifId);
  },
  updateSessionEmitter: async () => {},
  // beginGameEmitter: async () => {
  //   console.info("[BEGIN_GAME_ACK]: setting session to inProgress = true");
  //   await socket.emit("begin-game", true);
  // },
  disconnectSessionEmitter: async (playerName, roomName) => {
    console.log("[IO_em]: leaving room...", roomName);
    await socket.emit("disconnect", playerName, roomName);
  },
  endSessionEmitter: async (roomName) => {
    console.log("[END_SESSION_EMIT]: ", roomName, "session is ending");
    await socket.emit("end-session", roomName);
  },
});

const sessionStore = (set) => ({
  session: { ...baseSessionState },
  players: [],
  localPlayer: null,
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
  setLocalPlayer: (localPlayer) => {
    set((state) => {
      console.info("[SET_THIS_PLAYER]: ", localPlayer.playerName);
      return {
        localPlayer: {
          ...localPlayer,
        },
      };
    });
  },
  updateLocalPlayer: (localPlayer) => {
    set((state) => {
      console.info("[UPDATE_THIS_PLAYER]: ", localPlayer.playerName);
      return {
        localPlayer: {
          ...localPlayer,
          ...state.localPlayer,
        },
      };
    });
  },
  fetchPlayerList: (players) => {
    console.info("[FETCH_PLAYERS]: ", players);
    const playerObjects = players.map((player) => {
      return {
        ...player,
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
    console.info("[UPDATE_PLAYER_LIST]: ", players);
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

const giphyStore = (set) => ({
  giphyInstance: null,
  sessionGifs: [],
  tableGifs: [],
  setGiphySDK: (giffyFetch) => {
    console.log("[GIF]: setting api instance...");
    set((state) => {
      return {
        giphyInstance: giffyFetch,
      };
    });
  },
  setInitialGifs: (gifs) => {
    console.log("[GIF]: setting initial gifs...");
    set((state) => {
      return {
        sessionGifs: [...gifs],
      };
    });
  },
  updateSessionGifs: (gif) => {
    console.log("[GIF]: updating session gifs...");
    set((state) => {
      return {
        sessionGifs: [...state.sessionGifs, ...gif],
      };
    });
  },
  addGifToTable: (gif) => {
    console.log("[GIF]: updating table gifs...");
    set(state => {
      return {
        tableGifs: [gif, ...state.tableGifs]
      }
    })
  },
  removeGifFromHand: (gifId) => {
    set((state) => {
      const currentGifs = state.sessionGifs;
      return {
        sessionGifs: [...currentGifs.filter((gif) => gif.id !== gifId)],
      };
    });
  },
});
export const useSessionStore = create(devtools(sessionStore, "sessionStore"));
export const useEmitterStore = create(devtools(emitterStore, "emitterStore"));
export const useGiphyStore = create(devtools(giphyStore, "giphyStore"));
