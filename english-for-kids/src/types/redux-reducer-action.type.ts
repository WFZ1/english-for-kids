export default interface IReduxReducerAction {
  currentPage?: string;
  gameMode?: string;
  category?: string;
  currentCardIndex?: number;
  randomCards?: number[];
  type: string;
}
