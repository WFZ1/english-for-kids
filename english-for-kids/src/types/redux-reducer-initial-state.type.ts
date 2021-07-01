export default interface IReduxReducerInitialState {
  currentPage: string;
  gameMode: string;
  category: string;
  currentCardIndex: number;
  isPageChange: boolean;
  isGameStart: boolean;
  randomCards: number[];
  isCardCorrect: boolean;
  isCardError: boolean;
  isEndGame: boolean;
  countErrors: number;
};
