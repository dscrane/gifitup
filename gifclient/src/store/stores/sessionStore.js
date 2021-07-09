import { randomId } from "../../utils";
import history from "../../config/history";
// TODO:
//  think about separating player state into a new PlayerStore

// STATE UPDATE BREAKDOWN / THINK THROUGH
// id: set at initial load
// isInitialized: TRUE after landing on ../register route
// inRoom: TRUE after a player is created with name and socket room has been joined
// isStarted: TRUE after first judge hits 'Start Game' button
// *handDisabled: TRUE while a player is the judge OR has already played a card
// *roundInProgress: TRUE while players are choosing cards and while judge is choosing winner
// *displayJudgingModal: TRUE while the current judge is displaying and choosing a winner for the round
// *  set to FALSE when the moveToNextRound() fires

const baseSessionState = {
  id: randomId("S"),
  isInitialized: false,
  inRoom: false,
  isStarted: false,
  roundInProgress: false,
  fetchFromGiphy: false,
  handDisabled: false,
  displayPlayerModal: false,
  displayJudgementModal: false,
  cardSubmitted: false,
  roomId: null,
  shareURL: null,
};

export const sessionStore = (set) => ({
  ...baseSessionState,
  initializeSession: (roomId) => {
    history.push("/games");
    set((state) => {
      console.info("%c[INITIALIZE_SESSION]:", "color: green", true);
      return {
        ...state.session,
        isInitialized: true,
        displayPlayerModal: true,
        roomId: roomId,
        inRoom: true,
      };
    });
  },
  updateSession: (updates) => {
    console.info("%c[UPDATE_SESSION]:", "color: green", updates);
    set((state) => {
      return {
        ...state.session,
        ...updates,
      };
    });
  },
  toggleFetchFromGiphy: (bool) => {
    console.info("%c[TOGGLE_FETCH]: ", "color: green", bool);
    set((state) => {
      return {
        ...state.session,
        fetchFromGiphy: bool,
      };
    });
  },
  toggleJudgementModal: () => {
    console.info("%c[TOGGLE_MODAL]: ", "color: green");
    set((state) => {
      return {
        ...state.session,
        displayJudgementModal: !state.displayJudgementModal,
      };
    });
  },
  togglePlayerModal: () => {
    console.info("%c[TOGGLE_MODAL]: ", "color: green");
    set((state) => {
      return {
        ...state.session,
        displayPlayerModal: !state.displayPlayerModal,
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
        handDisabled: false,
        displayJudgingModal: false,
        roundInProgress: false,
        ...state.session,
      };
    });
  },
  // Currently unused
  // fetchPlayerList: (players) => {
  //   console.info("%c[FETCH_PLAYERS]: ", players, "color: green);
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
