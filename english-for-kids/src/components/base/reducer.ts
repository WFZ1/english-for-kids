import { APP_PAGE_CHANGE, GAME_CARD_CORRECT, GAME_CARD_ERROR, GAME_END, GAME_MODE_CHANGE, GAME_START, INITIAL_STATE } from "../../constants";
import IReduxReducerAction from "../../types/redux-reducer-action.type";
import IReduxReducerInitialState from "../../types/redux-reducer-initial-state.type";

function reducer(state: IReduxReducerInitialState = INITIAL_STATE, action: IReduxReducerAction): IReduxReducerInitialState {
  switch (action.type) {
    case APP_PAGE_CHANGE: {
      return {
        ...state,
        currentPage: action.currentPage || '',
        category: action.category || '',
        isPageChange: true,
        isGameStart: false
      };
    }
    case GAME_MODE_CHANGE:
      return {
        ...state,
        gameMode: action.gameMode || '',
        isPageChange: false,
        isGameStart: false
      };
    case GAME_START:
      return {
        ...state,
        currentCardIndex: action.currentCardIndex || 0,
        isPageChange: false,
        isGameStart: true,
        randomCards: action.randomCards || [],
        isCardCorrect: false,
        isCardError: false,
        isEndGame: false,
        countErrors: 0
      };
    case GAME_END:
      return {
        ...state,
        isGameStart: false,
        isEndGame: false,
        isCardCorrect: false,
        isCardError: false,
        isPageChange: true
      };
    case GAME_CARD_CORRECT: {
      const randomCards = state.randomCards.slice();
      randomCards.pop();

      let isEndGame = false;
      if (!randomCards.length) isEndGame = true;

      return {
        ...state,
        currentCardIndex: randomCards[randomCards.length - 1],
        randomCards,
        isCardCorrect: true,
        isCardError: false,
        isEndGame
      };
    }
    case GAME_CARD_ERROR:
      return {
        ...state,
        isCardCorrect: false,
        isCardError: true,
        countErrors: state.countErrors + 1
      };

    default:
      return state;
  }
}

export default reducer;
