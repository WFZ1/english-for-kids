import IGameStatistic from "../types/game-statistic.type";
import { EMPTY_STATISTICAL_DATA } from "../constants";

export default function getGameStatisticData(category: string, word: string): IGameStatistic {
  const key = `${ category }__${ word }`;
  const localData = localStorage.getItem(key);
  const parsedData = (localData) ? JSON.parse(localData) : EMPTY_STATISTICAL_DATA;

  return parsedData;
}
