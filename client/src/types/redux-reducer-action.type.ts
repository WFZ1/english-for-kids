import ICategoryWord from './category-word.type';

export default interface IReduxReducerAction {
  isAdmin?: boolean;
  currentPage?: string;
  category?: string;
  gameMode?: string;
  randomCards?: number[];
  currentCardIndex?: number;
  difficultWords?: ICategoryWord[];
  type: string;
}
