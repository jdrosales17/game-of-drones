export const types = {
  DO_START_GAME: "DO_START_GAME",
  DO_P1_MOVE: "DO_P1_MOVE",
  DO_P2_MOVE: "DO_P2_MOVE",
  DO_PLAY_AGAIN: "DO_PLAY_AGAIN"
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

export const doPlayAgain = () => {
  return {
    type: types.DO_PLAY_AGAIN
  };
};
