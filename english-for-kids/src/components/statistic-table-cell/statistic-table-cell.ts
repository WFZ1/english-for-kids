import "./statistic-table-cell.scss";
import BaseComponent from "../base/base-component";

export default class StatisticTableCell extends BaseComponent {
  constructor(cellSelector: keyof HTMLElementTagNameMap, text: string) {
    super(cellSelector, ['statistic-table-cell', `statistic-table-cell_view_${ cellSelector }`]);

    this.render(text);
  }

  private render(text: string): void {
    this.el.textContent = text;
  }
}
