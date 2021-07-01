export const playerStore = (set) => ({
  localPlayer: null,
  players: [],
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
});
