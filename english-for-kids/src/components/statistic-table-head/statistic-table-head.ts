import "./statistic-table-head.scss";
import BaseComponent from "../base/base-component";
import StatisticTableRow from "../statistic-table-row/statistic-table-row";
import { STATISTIC_TABLE_TITLES } from "../../constants";

export default class StatisticTableHead extends BaseComponent {
  private readonly statisticTableRow: StatisticTableRow;

  constructor() {
    super('thead', ['statistic-table-head']);

    this.statisticTableRow = new StatisticTableRow(STATISTIC_TABLE_TITLES, 'th');

    this.render();
  }

  private render(): void {
    this.el.append(this.statisticTableRow.el)
  }
}
