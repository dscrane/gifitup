import { randomId } from "../../utils";

// STATE UPDATE BREAKDOWN / THINK THROUGH
// id: set at initial load
// isInitialized: TRUE after landing on ../register route
// inRoom: TRUE after a player is created with name and socket room has been joined
// isStarted: TRUE after first judge hits 'Start Game' button
// *handDisabled: TRUE while a player is the judge OR has already played a card
// *roundInProgress: TRUE while players are choosing cards and while judge is choosing winner
// *displayJudgingModal: TRUE while the current judge is displaying and choosing a winner for the round

// * -> set to FALSE when the moveToNextRound() fires

const baseSessionState = {
  id: randomId("S"),
  isInitialized: false,
  inRoom: false,
  isStarted: false,
  roundInProgress: false,
  fetchFromGiphy: false,
  handDisabled: false,
  displayJudgingModal: false,
  roomId: null,
  shareURL: null,
};

export const sessionStore = (set) => ({
  session: {
    ...baseSessionState,
  },
  players: [],
  localPlayer: null,
  initializeSession: (roomId) => {
    set((state) => {
      console.info("[INITIALIZE_SESSION]:", true);
      return {
        session: {
          ...state.session,
          isInitialized: true,
          roomId: roomId,
          inRoom: true,
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
  toggleModalDisplay: (bool) => {
    console.info("[TOGGLE_MODAL]: ", bool);
    set((state) => {
      return {
        session: {
          ...state.session,
          displayJudgingModal: bool,
        },
      };
    });
  },
  beginRound: (data) => {
    console.log("[BEGIN_ROUND]: ");
    set((state) => {
      return {
        ...data,
        ...state.session,
      };
    });
  },
  moveToNextRound: () => {
    console.log("[NEXT_ROUND]: ");
    set((state) => {
      return {
        session: {
          handDisabled: false,
          displayJudgingModal: false,
          roundInProgress: false,
          ...state.session,
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
