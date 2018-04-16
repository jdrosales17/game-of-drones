import { types } from "./actions";

const initialState = {
  p1Name: "",
  p2Name: "",
  p1Moves: [],
  p2Moves: [],
  isP1Turn: true,
  p1Score: 0,
  p2Score: 0,
  gameStarted: false
};

const configuration = [
  { move: "paper", kills: "rock" },
  { move: "rock", kills: "scissors" },
  { move: "scissors", kills: "paper" }
];

function calculateRoundWinner(p1Move, p2Move) {
  for (let i = 0; i < configuration.length; i++) {
    if (p1Move === configuration[i].move && p2Move === configuration[i].kills) {
      return "P1";
    } else if (
      p2Move === configuration[i].move &&
      p1Move === configuration[i].kills
    ) {
      return "P2";
    }
  }
  return null;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DO_START_GAME: {
      return {
        ...state,
        p1Name: action.payload.p1Name,
        p2Name: action.payload.p2Name,
        gameStarted: true
      };
    }

    case types.DO_P1_MOVE: {
      const updatedP1Moves = [...state.p1Moves, action.payload];
      return {
        ...state,
        p1Moves: updatedP1Moves,
        isP1Turn: false
      };
    }

    case types.DO_P2_MOVE: {
      const updatedP2Moves = [...state.p2Moves, action.payload];
      const roundWinner = calculateRoundWinner(
        state.p1Moves[state.p1Moves.length - 1],
        updatedP2Moves[updatedP2Moves.length - 1]
      );

      if (roundWinner === "P1") {
        return {
          ...state,
          p2Moves: updatedP2Moves,
          isP1Turn: true,
          p1Score: state.p1Score + 1
        };
      } else if (roundWinner === "P2") {
        return {
          ...state,
          p2Moves: updatedP2Moves,
          isP1Turn: true,
          p2Score: state.p2Score + 1
        };
      } else {
        return {
          ...state,
          p2Moves: updatedP2Moves,
          isP1Turn: true
        };
      }
    }

    case types.DO_PLAY_AGAIN: {
      return {
        ...initialState
      };
    }

    default:
      return state;
  }
};

export default reducer;
