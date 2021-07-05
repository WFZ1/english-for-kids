import { APP_DIFFICULT_CATEGORY, APP_PAGE_CHANGE, GAME_CARD_CORRECT, GAME_CARD_ERROR, GAME_END, GAME_MODE_CHANGE, GAME_START, INITIAL_STATE } from "../../constants";
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
        isGameStart: false,
        isCardCorrect: false,
        isCardError: false
      };
    }
    case GAME_MODE_CHANGE:
      return {
        ...state,
        isPageChange: false,
        gameMode: action.gameMode || '',
        isGameStart: false
      };
    case GAME_START:
      return {
        ...state,
        isPageChange: false,
        isGameStart: true,
        isEndGame: false,
        randomCards: action.randomCards || [],
        currentCardIndex: action.currentCardIndex || 0,
        isCardCorrect: false,
        isCardError: false,
        countErrors: 0
      };
    case GAME_END:
      return {
        ...state,
        isPageChange: true,
        isGameStart: false,
        isEndGame: false,
        isCardCorrect: false,
        isCardError: false,
      };
    case GAME_CARD_CORRECT: {
      const randomCards = state.randomCards.slice();
      randomCards.pop();

      let isEndGame = false;
      if (!randomCards.length) isEndGame = true;

      return {
        ...state,
        isEndGame,
        randomCards,
        currentCardIndex: randomCards[randomCards.length - 1],
        isCardCorrect: true,
        isCardError: false
      };
    }
    case GAME_CARD_ERROR:
      return {
        ...state,
        isCardCorrect: false,
        isCardError: true,
        countErrors: state.countErrors + 1
      };
    case APP_DIFFICULT_CATEGORY: {
      const difficultWords = action.difficultWords?.slice() || [];

      return {
        ...state,
        difficultWords
      }
    }
    default:
      return state;
  }
}

export default reducer;
