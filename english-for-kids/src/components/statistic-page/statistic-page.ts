import "./statistic-page.scss";
import StatisticTable from "../statistic-table/statistic-table";
import Btn from "../base/btn/btn";
import createElement from "../../shared/create-element";
import router from "../base/router";
import store from "../base/store";
import ICategoryWord from "../../types/category-word.type";
import type StatisticTableRow from "../statistic-table-row/statistic-table-row";
import { APP_DIFFICULT_CATEGORY, BTN_REPEAT_DIFFICULT_WORDS_TEXT, BTN_RESET_STATISTIC_TEXT, DIFFICULT_WORDS_ACCURACY_LIMIT, DIFFICULT_WORDS_ACCURACY_TEXT, MAX_DIFFICULT_WORDS, STATISTIC_PAGE_URL, STATISTIC_TABLE_TITLES } from "../../constants";

export default class StatisticPage {
  private readonly containerEl: HTMLElement;

  private readonly btnRepeat: Btn;

  private readonly btnReset: Btn;

  private readonly statisticTable: StatisticTable;

  constructor (private readonly rootEl: HTMLElement) {
    this.containerEl = createElement('div', ['statistic-page__container']);

    this.btnRepeat = new Btn({ classes: (['statistic-page__btn', 'statistic-page__repeat']), text: BTN_REPEAT_DIFFICULT_WORDS_TEXT, title: DIFFICULT_WORDS_ACCURACY_TEXT });
    this.btnReset = new Btn({ classes: (['statistic-page__btn', 'statistic-page__reset']), text: BTN_RESET_STATISTIC_TEXT });

    this.statisticTable = new StatisticTable();

    this.attachListeners();
    this.build();
  }

  private attachListeners(): void {
    this.btnReset.attachHandler(() => this.reset());
    this.btnRepeat.attachHandler(() => this.handleDifficultWords());
  }

  private build(): void {
    this.containerEl.append(this.statisticTable.el);
  }

  render(): void {
    this.statisticTable.updateBody();

    this.rootEl.append(this.btnRepeat.el, this.btnReset.el, this.containerEl);
  }

  private reset(): void {
    localStorage.clear();
    this.statisticTable.updateBody();
  }

  private handleDifficultWords(): void {
    router.navigate(`category/${ STATISTIC_PAGE_URL }`);

    const indexHitCol = STATISTIC_TABLE_TITLES.length - 1;
    this.statisticTable.statisticTableBody.handleSort(indexHitCol, 'ascend');

    const sortedRows = this.statisticTable.statisticTableBody.rows;
    const filteredRows = StatisticPage.filterDifficultWords(sortedRows, indexHitCol);
    const structuredWords = StatisticPage.structureDifficultWords(filteredRows);

    store.dispatch({ type: APP_DIFFICULT_CATEGORY, difficultWords: structuredWords });
  }

  private static filterDifficultWords(rows: StatisticTableRow[], indexCol: number): StatisticTableRow[] {
    let maxRows = MAX_DIFFICULT_WORDS;

    const filteredRows = rows.filter((row) => {
      const cellsVal = {
        hit: row.cells[indexCol].el.textContent,
        wrong: row.cells[indexCol - 1].el.textContent
      };

      if (Number(cellsVal.hit) < DIFFICULT_WORDS_ACCURACY_LIMIT && cellsVal.wrong !== '0' && maxRows) {
        maxRows--;
        return true;
      }

      return false;
    });

    return filteredRows;
  }

  private static structureDifficultWords(rows: StatisticTableRow[]): ICategoryWord[] {
    return rows.map((row) => {
      const obj = {
        category: (row.cells[0].el.textContent) || '',
        word: (row.cells[1].el.textContent) || ''
      }

      return obj;
    });
  }
}
