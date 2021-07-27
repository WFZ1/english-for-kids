import ICategoryWord from './category-word.type';

export default interface IReduxReducerInitialState {
  isAdmin: boolean;
  isLogInOutDone: boolean;
  currentPage: string;
  category: string;
  isPageChange: boolean;
  gameMode: string;
  isGameStart: boolean;
  isEndGame: boolean;
  randomCards: number[];
  currentCardIndex: number;
  isCardCorrect: boolean;
  isCardError: boolean;
  countErrors: number;
  difficultWords: ICategoryWord[];
}
