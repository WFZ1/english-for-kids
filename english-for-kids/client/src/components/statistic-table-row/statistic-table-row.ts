import './statistic-table-row.scss';
import BaseComponent from '../base/base-component';
import StatisticTableCell from '../statistic-table-cell/statistic-table-cell';
import IStatisticTableRowValues from '../../types/statistic-table-row-values.type';

export default class StatisticTableRow extends BaseComponent {
  readonly cells: StatisticTableCell[] = [];

  constructor(
    rowData: IStatisticTableRowValues | string[],
    cellSelector: string,
  ) {
    super('tr', ['statistic-table-row']);

    this.render(rowData, cellSelector);
  }

  private render(
    rowData: IStatisticTableRowValues | string[],
    cellSelector: string,
  ): void {
    Object.values(rowData).forEach((text) => this.addCell(cellSelector, text));
  }

  private addCell(cellSelector: string, text: string) {
    const cell = new StatisticTableCell(
      cellSelector as keyof HTMLElementTagNameMap,
      text,
    );

    this.cells.push(cell);
    this.el.append(cell.el);
  }
}
