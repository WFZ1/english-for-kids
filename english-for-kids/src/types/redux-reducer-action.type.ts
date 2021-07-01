export default interface IReduxReducerAction {
  currentPage?: string;
  category?: string;
  gameMode?: string;
  randomCards?: number[];
  currentCardIndex?: number;
  type: string;
}
