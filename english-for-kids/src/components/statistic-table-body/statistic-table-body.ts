import "./statistic-table-body.scss";
import BaseComponent from "../base/base-component";
import StatisticTableRow from "../statistic-table-row/statistic-table-row";
import { CATEGORY_CARDS, WORD_CARDS } from "../../constants";

export default class StatisticTableBody extends BaseComponent {
  private readonly rows: StatisticTableRow[] = [];

  constructor() {
    super('tbody', ['statistic-table-body']);

    this.render();
  }

  private render(): void {
    CATEGORY_CARDS.forEach((category, index) => {
      WORD_CARDS[index].forEach((card) => {
        const rowData = [category.title, card.word, card.translation, '0', '0', '0', '0'];

        const statisticTableRow = new StatisticTableRow(rowData, 'td');

        this.rows.push(statisticTableRow);
        this.el.append(statisticTableRow.el);
      });
    });
  }
}
