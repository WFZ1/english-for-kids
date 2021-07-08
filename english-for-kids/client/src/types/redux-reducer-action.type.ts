import ICategoryWord from './category-word.type';

export default interface IReduxReducerAction {
  currentPage?: string;
  category?: string;
  gameMode?: string;
  randomCards?: number[];
  currentCardIndex?: number;
  difficultWords?: ICategoryWord[];
  type: string;
}
