import { randomId } from "../../utils";

const baseSessionState = {
  id: randomId("S"),
  initialized: false,
  roomId: null,
  fetchFromGiphy: false,
};

export const sessionStore = (set) => ({
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
          roomId: roomId,
          shareURL: "http://localhost:3000/join/" + roomId,
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
          ...state.localPlayer,
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
        players: [
          ...state.players.filter((player) => player.playerId !== playerId),
        ],
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
  // Currently unused
  // fetchPlayerList: (players) => {
  //   console.info("[FETCH_PLAYERS]: ", players);
  //   const playerObjects = players.map((player) => {
  //     return {
  //       ...player,
  //     };
  //   });
  //   set((state) => {
  //     return {
  //       ...state,
  //       players: [...state.players, ...playerObjects],
  //     };
  //   });
  // },
});
