import { types } from "./actions";

const initialState = {
  p1Name: "",
  p2Name: "",
  rounds: [],
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

function calculateRoundWinner (p1Move, p2Move, p1Name, p2Name) {
  for (let i = 0; i < configuration.length; i++) {
    if (p1Move === configuration[i].move && p2Move === configuration[i].kills) {
      return {
        p1Move: p1Move,
        p2Move: p2Move,
        winner: p1Name
      };
    } else if (p2Move === configuration[i].move && p1Move === configuration[i].kills) {
      return {
        p1Move: p1Move,
        p2Move: p2Move,
        winner: p2Name
      };
    }
  }
  return {
    p1Move: p1Move,
    p2Move: p2Move
  };
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
      const newRound = { p1Move: action.payload };
      const updatedRounds = [...state.rounds, newRound];
      return {
        ...state,
        rounds: updatedRounds,
        isP1Turn: false
      };
    }

    case types.DO_P2_MOVE: {
      const roundCompleted = calculateRoundWinner(
        state.rounds[state.rounds.length - 1].p1Move,
        action.payload,
        state.p1Name,
        state.p2Name
      );
      const updatedRounds = [
        ...state.rounds.slice(0, -1),
        roundCompleted
      ];

      if (roundCompleted.winner === state.p1Name) {
        return {
          ...state,
          rounds: updatedRounds,
          isP1Turn: true,
          p1Score: state.p1Score + 1
        };
      } else if (roundCompleted.winner === state.p2Name) {
        return {
          ...state,
          rounds: updatedRounds,
          isP1Turn: true,
          p2Score: state.p2Score + 1
        };
      } else {
        return {
          ...state,
          rounds: updatedRounds,
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
