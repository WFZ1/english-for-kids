import './statistic-table-head.scss';
import BaseComponent from '../base/base-component';
import StatisticTableRow from '../statistic-table-row/statistic-table-row';
import {
  STATISTIC_CELL_SORT_CLASSES,
  STATISTIC_TABLE_TITLES,
} from '../../constants';

export default class StatisticTableHead extends BaseComponent {
  readonly statisticTableRow: StatisticTableRow;

  constructor() {
    super('thead', ['statistic-table-head']);

    this.statisticTableRow = new StatisticTableRow(
      STATISTIC_TABLE_TITLES,
      'th',
    );

    this.render();
  }

  private render(): void {
    this.el.append(this.statisticTableRow.el);
  }

  handleSort(target: HTMLElement): void {
    this.hideSort(target);
    StatisticTableHead.toggleSort(target);
  }

  private static toggleSort(target: HTMLElement): void {
    if (target.classList.contains(STATISTIC_CELL_SORT_CLASSES.descend)) {
      target.classList.remove(STATISTIC_CELL_SORT_CLASSES.descend);
      target.classList.add(STATISTIC_CELL_SORT_CLASSES.ascend);
    } else if (target.classList.contains(STATISTIC_CELL_SORT_CLASSES.ascend)) {
      target.classList.remove(STATISTIC_CELL_SORT_CLASSES.ascend);
      target.classList.add(STATISTIC_CELL_SORT_CLASSES.descend);
    } else {
      target.classList.add(STATISTIC_CELL_SORT_CLASSES.descend);
    }
  }

  private hideSort(target: HTMLElement): void {
    this.statisticTableRow.cells.forEach((cell) => {
      if (cell.el === target) return;

      cell.el.classList.remove(
        STATISTIC_CELL_SORT_CLASSES.descend,
        STATISTIC_CELL_SORT_CLASSES.ascend,
      );
    });
  }
}
