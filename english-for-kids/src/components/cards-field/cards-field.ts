import './cards-field.scss';
import BaseComponent from '../base/base-component';
import WordCard from '../word-card/word-card';
import store from '../base/store';
import getAudio from '../../shared/get-audio';
import getContainEl from '../../shared/get-contain-el';
import getGameStatisticData from '../../shared/get-game-statistic-data';
import IWordCardProps from '../../types/word-card-props.type';
import IGameStatistic from '../../types/game-statistic.type';
import {
  GAME_CARDS_SOUND_NOTICES,
  GAME_CARD_CORRECT,
  GAME_CARD_ERROR,
  TRAIN,
} from '../../constants';

export default class CardsField extends BaseComponent {
  cards: WordCard[] = [];

  private readonly audioCorrect: HTMLAudioElement;

  private readonly audioError: HTMLAudioElement;

  constructor() {
    super('div', ['cards-field']);

    this.audioCorrect = getAudio(
      GAME_CARDS_SOUND_NOTICES.correct.folder,
      GAME_CARDS_SOUND_NOTICES.correct.audio,
    );
    this.audioError = getAudio(
      GAME_CARDS_SOUND_NOTICES.error.folder,
      GAME_CARDS_SOUND_NOTICES.error.audio,
    );

    this.attachListener();
  }

  private attachListener(): void {
    this.el.addEventListener('click', (e) => {
      const state = store.getState();

      if (state.gameMode === TRAIN) {
        this.trainCard(e);
      } else if (state.isGameStart) {
        this.checkCard(e);
      }
    });
  }

  private trainCard(e: MouseEvent): void {
    let card = this.getCard(e, '.word-card__rotate');

    if (card) {
      card.trainCard();

      CardsField.updateGameStatisticInStorage(card, 'trained');
    } else {
      card = this.getCard(e, '.word-card__front');

      if (card && !card.isFlipped) {
        card.playAudio();

        CardsField.updateGameStatisticInStorage(card, 'trained');
      }
    }
  }

  private checkCard(e: MouseEvent): void {
    const currentCard = this.getCard(e, '.word-card');

    if (currentCard) {
      const state = store.getState();
      const card = this.cards[state.currentCardIndex];

      if (card === currentCard) {
        this.execActionsCorrectCard(card);
      } else {
        this.execActionsWrongCard(card);
      }
    }
  }

  private execActionsCorrectCard(card: WordCard): void {
    this.audioCorrect.play();

    card.disableCard();

    store.dispatch({ type: GAME_CARD_CORRECT });

    CardsField.updateGameStatisticInStorage(card, 'correct');
  }

  private execActionsWrongCard(card: WordCard): void {
    this.audioError.play();

    store.dispatch({ type: GAME_CARD_ERROR });

    CardsField.updateGameStatisticInStorage(card, 'wrong');
  }

  private getCard(e: Event, selector: string): undefined | WordCard {
    const target = getContainEl(e.target as HTMLElement, selector, this.el);

    if (target) {
      const el = target.closest('.word-card');
      const pointer = this.cards.find((card) => card.el === el);

      return pointer;
    }

    return undefined;
  }

  private static updateGameStatisticInStorage(
    card: WordCard,
    statisticType: string,
  ): void {
    const { category } = card.frontEl.dataset;
    const word = card.wordEnEl.textContent;

    if (!word || !category) return;

    const key = `${category}__${word}`;
    const data = getGameStatisticData(category, word);
    const newData = CardsField.updateStatisticData(data, statisticType);

    localStorage.setItem(key, JSON.stringify(newData));
  }

  private static updateStatisticData(
    data: IGameStatistic,
    statisticType: string,
  ): IGameStatistic {
    const newData = { ...data };

    switch (statisticType) {
      case 'trained':
        newData.trained++;
        break;
      case 'correct':
        newData.correct++;
        break;
      case 'wrong':
        newData.wrong++;
        break;
      default:
    }

    return newData;
  }

  clear(): void {
    this.cards = [];
    this.el.innerHTML = '';
  }

  addCards(wordCards: IWordCardProps[], categoryName: string): void {
    this.clear();

    wordCards.forEach((cardProps) => this.addCard(cardProps, categoryName));
  }

  addCard(cardProps: IWordCardProps, categoryName: string): void {
    const newCardProps = { ...cardProps };
    newCardProps.image = `assets/images/category-cards/${categoryName}/${cardProps.image}`;

    const wordCard = new WordCard(newCardProps, categoryName);

    this.cards.push(wordCard);
    this.el.append(wordCard.el);
  }
}
