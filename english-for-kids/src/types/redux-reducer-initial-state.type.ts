export default interface IReduxReducerInitialState {
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
};
