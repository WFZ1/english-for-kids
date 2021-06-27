import { Action } from "redux";
import { GAME_PLAY, GAME_TRAIN, INITIAL_STATE, PLAY, TRAIN } from "../../constants";
import IInitialState from "../../types/initial-state.type";

function reducer(state = INITIAL_STATE, action: Action): IInitialState {
  switch (action.type) {
    case GAME_TRAIN:
      return {
        ...state,
        gameState: TRAIN
      };
    case GAME_PLAY:
      return {
        ...state,
        gameState: PLAY
      };
    default:
      return state;
  }
}

export default reducer;
