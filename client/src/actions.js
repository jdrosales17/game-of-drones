import axios from "axios";

export const types = {
  DO_START_GAME: "DO_START_GAME",
  DO_P1_MOVE: "DO_P1_MOVE",
  DO_P2_MOVE: "DO_P2_MOVE",
  GO_TO_GAME_MENU: "GO_TO_GAME_MENU",
  SAVE_GAME_START: "SAVE_GAME_START",
  SAVE_GAME_SUCCESS: "SAVE_GAME_SUCCESS",
  SAVE_GAME_FAIL: "SAVE_GAME_FAIL",
  FETCH_PLAYERS_START: "FETCH_PLAYERS_START",
  FETCH_PLAYERS_SUCCESS: "FETCH_PLAYERS_SUCCESS",
  FETCH_PLAYERS_FAIL: "FETCH_PLAYERS_FAIL"
};

export const doStartGame = (p1Name, p2Name) => {
  return {
    type: types.DO_START_GAME,
    payload: { p1Name, p2Name }
  };
};

export const doP1Move = move => {
  return {
    type: types.DO_P1_MOVE,
    payload: move
  };
};

export const doP2Move = move => {
  return {
    type: types.DO_P2_MOVE,
    payload: move
  };
};

export const goToGameMenu = () => {
  return {
    type: types.GO_TO_GAME_MENU
  };
};

export const saveGameStart = () => {
  return {
    type: types.SAVE_GAME_START
  };
};

export const saveGameSuccess = () => {
  return {
    type: types.SAVE_GAME_SUCCESS
  };
};

export const saveGameFail = () => {
  return {
    type: types.SAVE_GAME_FAIL
  };
};

export const getPlayersStart = () => {
  return {
    type: types.FETCH_PLAYERS_START
  };
};

export const getPlayersSuccess = response => {
  return {
    type: types.FETCH_PLAYERS_SUCCESS,
    payload: response
  };
};

export const getPlayersFail = () => {
  return {
    type: types.FETCH_PLAYERS_FAIL
  };
};

export function saveGame(game, winner) {
  return function(dispatch) {
    dispatch(saveGameStart());
    return axios
      .post("http://localhost:8080/players", {
        name: game.p1,
        winner: winner === "P1" ? true : false
      })
      .then(response => {
        return axios.post("http://localhost:8080/players", {
          name: game.p2,
          winner: winner === "P2" ? true : false
        });
      })
      .then(response => {
        return axios.post("http://localhost:8080/games", {
          p1: game.p1,
          p2: game.p2,
          rounds: game.rounds,
          winner: winner === "P1" ? game.p1 : game.p2
        });
      })
      .then(response => {
        console.log(response);
        dispatch(saveGameSuccess());
      })
      .catch(error => {
        console.log(error);
        dispatch(saveGameFail());
      });
  };
};

export function getPlayers() {
  return function(dispatch) {
    dispatch(getPlayersStart());
    return axios
    .get("http://localhost:8080/players")
    .then(response => {
      console.log(response);
      dispatch(getPlayersSuccess(response.data));
    })
    .catch(error => {
      console.log(error);
      dispatch(getPlayersFail());
    });
  };
};
