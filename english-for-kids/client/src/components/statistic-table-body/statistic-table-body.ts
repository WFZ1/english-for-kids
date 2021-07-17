import './statistic-table-body.scss';
import BaseComponent from '../base/base-component';
import StatisticTableRow from '../statistic-table-row/statistic-table-row';
import getData from '../../shared/get-data';
import getGameStatisticData from '../../shared/get-game-statistic-data';
import IGameStatistic from '../../types/game-statistic.type';
import ICategoryCardProps from '../../types/category-card-props.type';
import IWordCardProps from '../../types/word-card-props.type';
import IStatisticTableRowValues from '../../types/statistic-table-row-values.type';
import {
  PERCENT_100,
  SERVER_API_CATEGORIES_URL,
  SERVER_API_WORDS_URL,
} from '../../constants';

export default class StatisticTableBody extends BaseComponent {
  rows: StatisticTableRow[] = [];

  constructor() {
    super('tbody', ['statistic-table-body']);
  }

  async render(): Promise<void> {
    this.clear();

    const categories = await getData(SERVER_API_CATEGORIES_URL);
    const words = await getData(SERVER_API_WORDS_URL);

    categories.forEach((category: ICategoryCardProps, index) => {
      (words[index] as IWordCardProps[]).forEach((card) => {
        const data = getGameStatisticData(category.handle, card.word);

        const percentCorrect =
          StatisticTableBody.getPercentCorrectAnswers(data);

        const rowData = StatisticTableBody.uniteTableRowValues(
          category,
          card,
          data,
          percentCorrect,
        );

        const statisticTableRow = new StatisticTableRow(rowData, 'td');

        this.rows.push(statisticTableRow);
        this.el.append(statisticTableRow.el);
      });
    });
  }

  private static getPercentCorrectAnswers(data: IGameStatistic): number {
    return data.correct
      ? Math.round((data.correct / (data.correct + data.wrong)) * PERCENT_100)
      : 0;
  }

  private static uniteTableRowValues(
    category: ICategoryCardProps,
    card: IWordCardProps,
    data: IGameStatistic,
    percentCorrect: number,
  ): IStatisticTableRowValues {
    return {
      category: category.title,
      word: card.word,
      translation: card.translation,
      trained: data.trained,
      correct: data.correct,
      wrong: data.wrong,
      percentCorrect,
    };
  }

  private clear(): void {
    this.rows = [];
    this.el.innerHTML = '';
  }

  handleSort(colIndex: number, sortType: string): void {
    const cellVal = this.rows[0].cells[colIndex].el.textContent;

    if (!cellVal) return;

    const typeCell = Number.isNaN(+cellVal) ? 'str' : 'num';

    this.rows.sort((a, b) =>
      StatisticTableBody.sortRows(a, b, sortType, colIndex, typeCell),
    );

    this.updateEl();
  }

  private static sortRows(
    a: StatisticTableRow,
    b: StatisticTableRow,
    sortType: string,
    colIndex: number,
    typeCell: string,
  ): number {
    const cells = {
      a: a.cells[colIndex].el.textContent,
      b: b.cells[colIndex].el.textContent,
    };

    if (!cells.a || !cells.b) return 0;

    if (typeCell === 'str') {
      return sortType === 'descend'
        ? cells.a.localeCompare(cells.b)
        : cells.b.localeCompare(cells.a);
    }

    return sortType === 'descend' ? +cells.b - +cells.a : +cells.a - +cells.b;
  }

  private updateEl(): void {
    this.el.innerHTML = '';
    this.rows.forEach((row) => this.el.append(row.el));
  }
}
