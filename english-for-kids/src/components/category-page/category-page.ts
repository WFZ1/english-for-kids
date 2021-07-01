import './category-page.scss';
import CardsField from '../cards-field/cards-field';
import createElement from '../../shared/create-element';
import { CATEGORY_CARDS, GAME_START, WORD_CARDS } from '../../constants';
import IWordCard from '../../types/word-card.type';
import BtnStartGame from '../btn-start-game/btn-start-game';
import store from '../base/store';
import GameScore from '../game-score/game-score';
import delay from '../../shared/delay';

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

    this.subscribeToChangeState();
    this.addHandlerStartGame();
  }

  render(categoryName: string, title: string): void {
    this.titleEl.textContent = title;

    const data = CategoryPage.getCategoryCardsData(categoryName);
    this.cardsField.addCards(data, categoryName);

    this.rootEl.append(this.titleEl, this.gameScore.el, this.cardsField.el, this.btnStartGame.el);
  }

  private static getCategoryCardsData(categoryName: string): IWordCard[] {
    const categoryIndex = CATEGORY_CARDS.findIndex((card) => card.handle === categoryName);
    const data = WORD_CARDS[categoryIndex];
    return data;
  }

  private subscribeToChangeState(): void {
    store.subscribe(this.changeState.bind(this));
  }

  private async changeState(): Promise<void> {
    const state = store.getState();

    if (state.isCardCorrect) {
      this.gameScore.success();
      await delay(500);
      this.playAudioCurrentCard();
    }
    else if (state.isCardError) {
      this.gameScore.error();
    }
    else if (state.isEndGame || state.isPageChange) {
      this.gameScore.reset();
    }
  }

  private addHandlerStartGame(): void {
    this.btnStartGame.attachHandlerStartGame(() => {
      this.startGame();
      this.playAudioCurrentCard();
    });
  }

  private startGame(): void {
    if (!store.getState().isGameStart) {
      const randomArr = this.createRandomArray();

      store.dispatch({ type: GAME_START, randomCards: randomArr, currentCardIndex: randomArr[randomArr.length - 1] });
    }
  }

  private playAudioCurrentCard(): void {
    const { currentCardIndex } = store.getState();
    this.cardsField.cards[currentCardIndex].playAudio();
  }

  private createRandomArray(): number[] {
    const countCards = this.cardsField.cards.length;
    const arr = [...Array(countCards).keys()];

    arr.sort(() => Math.random() - 0.5);

    return arr;
  }
}
