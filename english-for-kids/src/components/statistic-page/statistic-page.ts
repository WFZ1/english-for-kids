import "./statistic-page.scss";
import StatisticTable from "../statistic-table/statistic-table";
import createElement from "../../shared/create-element";

export default class StatisticPage {
  private readonly containerEl: HTMLElement;

  private readonly statisticTable: StatisticTable;

  constructor (private readonly rootEl: HTMLElement) {
    this.containerEl = createElement('div', ['statistic-page__container']);

    this.statisticTable = new StatisticTable();
  }

  render(): void {
    this.rootEl.append(this.containerEl);
    this.containerEl.append(this.statisticTable.el);
  }
}
