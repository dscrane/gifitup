// STATE UPDATE BREAKDOWN / THINK THROUGH
/* LOCAL PLAYER
  // playerId: randomly generated player id
  // playerName: user entered name to display in game
  // socketId: socket.io id created on initial connection
  // roomId: room id that they are currently in
  // queryOffset: offset for querying the giphy api
  // points: current score
  // isJudge: TRUE when judging a round
  // inGameRoom: TRUE once the "player-joined" listener fires
  // isConnected: TRUE once the "set-local-player" listener fires
*/
/* PLAYERS
  // array of player objects for the other players in the current room
*/

export const playerStore = (set) => ({
  localPlayer: null,
  players: [],
  playerNames: [],
  setLocalPlayer: (localPlayer) => {
    set((state) => {
      console.info("[SET_THIS_PLAYER]: ", localPlayer);
      return {
        localPlayer: {
          ...localPlayer,
        },
      };
    });
  },
  updateLocalPlayer: (updates) => {
    set((state) => {
      console.info("[UPDATE_LOCAL_PLAYER]: ", updates);
      return {
        localPlayer: {
          ...state.localPlayer,
          ...updates,
        },
      };
    });
  },
  updatePlayerList: (players) => {
    console.info("[UPDATE_PLAYER_LIST]: ", players);
    set((state) => {
      console.log(players, state.players);
      return {
        players: [...players],
      };
    });
  },
  addPlayerToList: (players) => {
    console.info("[ADD_PLAYER]: ", players);
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
