import "./statistic-table-body.scss";
import BaseComponent from "../base/base-component";
import StatisticTableRow from "../statistic-table-row/statistic-table-row";
import getGameStatisticData from "../../shared/get-game-statistic-data";
import IGameStatistic from "../../types/game-statistic.type";
import ICategoryCardProps from "../../types/category-card-props.type";
import IWordCardProps from "../../types/word-card-props.type";
import IStatisticTableRowValues from "../../types/statistic-table-row-values.type";
import { CATEGORY_CARDS, PERCENT_100, WORD_CARDS } from "../../constants";

export default class StatisticTableBody extends BaseComponent {
  private rows: StatisticTableRow[] = [];

  constructor() {
    super('tbody', ['statistic-table-body']);
  }

  render(): void {
    this.clear();

    CATEGORY_CARDS.forEach((category, index) => {
      WORD_CARDS[index].forEach((card) => {
        const data = getGameStatisticData(category.handle, card.word);

        const percentCorrect = StatisticTableBody.getPercentCorrectAnswers(data);

        const rowData = StatisticTableBody.uniteTableRowValues(category, card, data, percentCorrect);

        const statisticTableRow = new StatisticTableRow(rowData, 'td');

        this.rows.push(statisticTableRow);
        this.el.append(statisticTableRow.el);
      });
    });
  }

  private static getPercentCorrectAnswers(data: IGameStatistic): number {
    return (data.correct) ? Math.round(data.correct / (data.correct + data.wrong) * PERCENT_100) : 0;
  }

  private static uniteTableRowValues(category: ICategoryCardProps, card: IWordCardProps, data: IGameStatistic, percentCorrect: number): IStatisticTableRowValues {
    return {
      category: category.title,
      word: card.word,
      translation: card.translation,
      trained: data.trained,
      correct: data.correct,
      wrong: data.wrong,
      percentCorrect
    }
  }

  private clear(): void {
    this.rows = [];
    this.el.innerHTML = '';
  }
}
