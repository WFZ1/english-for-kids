import "./statistic-table-row.scss";
import BaseComponent from "../base/base-component";
import StatisticTableCell from "../statistic-table-cell/statistic-table-cell";

export default class StatisticTableRow extends BaseComponent {
  private readonly cells: StatisticTableCell[] = [];

  constructor(rowData: string[], cellSelector: string) {
    super('tr', ['statistic-table-row']);

    this.render(rowData, cellSelector);
  }

  private render(rowData: string[], cellSelector: string): void {
    rowData.forEach((text) => this.addCell(cellSelector, text));
  }

  private addCell(cellSelector: string, text: string) {
    const cell = new StatisticTableCell(cellSelector as keyof HTMLElementTagNameMap, text);

    this.cells.push(cell);
    this.el.append(cell.el);
  }
}
