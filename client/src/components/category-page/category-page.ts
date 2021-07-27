import './category-page.scss';
import GameScore from '../game-score/game-score';
import CardsField from '../cards-field/cards-field';
import BtnStartGame from '../btn-start-game/btn-start-game';
import createElement from '../../shared/create-element';
import store from '../base/store';
import delay from '../../shared/delay';
import handleizeString from '../../shared/handleize-string';
import getData from '../../shared/get-data';
import ICategoryCardProps from '../../types/category-card-props.type';
import IWordCardProps from '../../types/word-card-props.type';
import IReduxReducerInitialState from '../../types/redux-reducer-initial-state.type';
import {
  GAME_START,
  SERVER_API_CATEGORIES_URL,
  SERVER_API_WORDS_URL,
  STATISTIC_PAGE_URL,
} from '../../constants';

export default class CategoryPage {
  private readonly cardsField: CardsField;

  private readonly titleEl: HTMLElement;

  private readonly gameScore: GameScore;

  private readonly btnStartGame: BtnStartGame;

  constructor(private readonly rootEl: HTMLElement) {
    this.titleEl = createElement('h2', ['category-page__title']);
    this.gameScore = new GameScore(['category-page__game-score']);
    this.cardsField = new CardsField();
    this.btnStartGame = new BtnStartGame(['category-page__btn-start']);

    this.subscribeToChangeAppState();
    this.addHandlerStartGame();
  }

  async render(title: string): Promise<void> {
    this.cardsField.clear();

    this.titleEl.textContent = title;

    const state = store.getState();
    const { category } = state;

    if (category !== STATISTIC_PAGE_URL) {
      const cardsData = await CategoryPage.getCategoryCardsData(category);
      if (!cardsData) return;

      this.cardsField.addCards(cardsData, category);
    } else {
      this.handleDifficultWordsCategory(state);
    }

    this.rootEl.append(
      this.titleEl,
      this.gameScore.el,
      this.cardsField.el,
      this.btnStartGame.el,
    );
  }

  private static async getCategoryCardsData(
    categoryName: string,
  ): Promise<IWordCardProps[]> {
    const categories = await getData(SERVER_API_CATEGORIES_URL);
    const words = await getData(SERVER_API_WORDS_URL);

    const categoryIndex = categories.findIndex(
      (card: ICategoryCardProps) => card.handle === categoryName,
    );
    const data = words[categoryIndex];

    return data;
  }

  handleDifficultWordsCategory(state: IReduxReducerInitialState): void {
    const { difficultWords } = state;

    if (!difficultWords.length) return;

    difficultWords.forEach(async (obj) => {
      const objCategory = handleizeString(obj.category);
      const cardsData = await CategoryPage.getCategoryCardsData(objCategory);

      if (!cardsData) return;

      const word = cardsData.find((card) => card.word === obj.word);

      if (word) {
        this.cardsField.addCard(word, objCategory);
      }
    });
  }

  private subscribeToChangeAppState(): void {
    store.subscribe(this.changeStateApp.bind(this));
  }

  private async changeStateApp(): Promise<void> {
    const state = store.getState();

    if (state.isCardCorrect && !state.isEndGame) {
      this.gameScore.success();
      await delay(500);
      this.playAudioCurrentCard();
    } else if (state.isCardError) {
      this.gameScore.error();
    } else if (state.isEndGame || state.isPageChange) {
      this.gameScore.reset();
    }
  }

  private playAudioCurrentCard(): void {
    const { currentCardIndex } = store.getState();
    this.cardsField.cards[currentCardIndex].playAudio();
  }

  private addHandlerStartGame(): void {
    this.btnStartGame.attachHandlerStartGame(() => {
      if (!this.cardsField.cards.length) return;

      this.startGame();
      this.playAudioCurrentCard();
    });
  }

  private startGame(): void {
    if (!store.getState().isGameStart) {
      const randomArr = this.createCardsRandomArray();
      this.btnStartGame.changeView();

      store.dispatch({
        type: GAME_START,
        randomCards: randomArr,
        currentCardIndex: randomArr[randomArr.length - 1],
      });
    }
  }

  private createCardsRandomArray(): number[] {
    const countCards = this.cardsField.cards.length;
    const arr = [...Array(countCards).keys()];

    arr.sort(() => Math.random() - 0.5);

    return arr;
  }
}
