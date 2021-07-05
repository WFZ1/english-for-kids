import './statistic-table.scss';
import BaseComponent from '../base/base-component';
import StatisticTableHead from '../statistic-table-head/statistic-table-head';
import StatisticTableBody from '../statistic-table-body/statistic-table-body';
import getContainEl from '../../shared/get-contain-el';
import { STATISTIC_CELL_SORT_CLASSES } from '../../constants';

export default class StatisticTable extends BaseComponent {
  private readonly statisticTableHead: StatisticTableHead;

  readonly statisticTableBody: StatisticTableBody;

  constructor() {
    super('table', ['statistic-table']);

    this.statisticTableHead = new StatisticTableHead();
    this.statisticTableBody = new StatisticTableBody();

    this.attachListener();
    this.render();
  }

  private render(): void {
    this.el.append(this.statisticTableHead.el, this.statisticTableBody.el);
  }

  private attachListener(): void {
    this.el.addEventListener('click', (e) => this.sortData(e));
  }

  private sortData(e: MouseEvent): void {
    const target = getContainEl(
      e.target as HTMLElement,
      'th',
      this.statisticTableHead.el,
    );

    if (target) {
      this.statisticTableHead.handleSort(target);

      const colIndex =
        this.statisticTableHead.statisticTableRow.cells.findIndex(
          (cell) => cell.el === target,
        );
      const sortType = target.classList.contains(
        STATISTIC_CELL_SORT_CLASSES.descend,
      )
        ? 'descend'
        : 'ascend';

      this.statisticTableBody.handleSort(colIndex, sortType);
    }
  }

  updateBody(): void {
    this.statisticTableBody.render();
  }
}
