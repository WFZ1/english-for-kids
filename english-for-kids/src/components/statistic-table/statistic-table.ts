import "./statistic-table.scss";
import BaseComponent from "../base/base-component";
import StatisticTableHead from "../statistic-table-head/statistic-table-head";
import StatisticTableBody from "../statistic-table-body/statistic-table-body";

export default class StatisticTable extends BaseComponent {
  private readonly statisticTableHead: StatisticTableHead;

  private readonly statisticTableBody: StatisticTableBody;

  constructor() {
    super('table', ['statistic-table']);

    this.statisticTableHead = new StatisticTableHead();
    this.statisticTableBody = new StatisticTableBody();

    this.render();
  }

  private render(): void {
    this.el.append(this.statisticTableHead.el, this.statisticTableBody.el);
  }

  updateBody(): void {
    this.statisticTableBody.render();
  }
}
