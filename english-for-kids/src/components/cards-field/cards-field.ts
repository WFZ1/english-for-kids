import './cards-field.scss';
import BaseComponent from '../base/base-component';
import WordCard from '../word-card/word-card';
import IWordCard from '../../types/word-card.type';
import getContainEl from '../../shared/get-contain-el';
import store from '../base/store';
import { GAME_CARD_CORRECT, GAME_CARD_ERROR, TRAIN } from '../../constants';
import getAudio from '../../shared/get-audio';

export default class CardsField extends BaseComponent {
  cards: WordCard[] = [];

  private readonly audioCorrect: HTMLAudioElement;

  private readonly audioError: HTMLAudioElement;

  constructor() {
    super('div', ['cards-field']);

    this.audioCorrect = getAudio('notices', 'correct.mp3');
    this.audioError = getAudio('notices', 'error.mp3');

    this.attachListener();
  }

  private attachListener(): void {
    this.el.addEventListener('click', (e) => {
      const state = store.getState();

      if (store.getState().gameMode === TRAIN) {
        this.trainCard(e)
      } else if (state.isGameStart) {
        this.checkCard(e)
      }
    });
  }

  private clear(): void {
    this.cards = [];
    this.el.innerHTML = '';
  }

  private trainCard(e: MouseEvent): void {
    const rotateEl = this.getCard(e, '.word-card__rotate');

    if (rotateEl) rotateEl.trainCard(rotateEl);
    else {
      const cardFrontEl = this.getCard(e, '.word-card__front');

      if (cardFrontEl && !cardFrontEl.isFlipped) cardFrontEl.playAudio();
    }
  }

  private checkCard(e: MouseEvent): void {
    const currentCard = this.getCard(e, '.word-card');

    if (currentCard) {
      const state = store.getState();
      const card = this.cards[state.currentCardIndex];

      if (card === currentCard) {
        this.audioCorrect.play();
        card.disableCard();
        store.dispatch({ type: GAME_CARD_CORRECT });
      } else {
        this.audioError.play();
        store.dispatch({ type: GAME_CARD_ERROR });
      }
    }
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

  addCards(wordCards: IWordCard[], categoryName: string): void {
    this.clear();

    wordCards.forEach((cardProps) => {
      const newCardProps = { ...cardProps };
      newCardProps.image = `assets/images/category-cards/${ categoryName }/${ cardProps.image }`

      const wordCard = new WordCard(newCardProps, categoryName);

      this.cards.push(wordCard);
      this.el.append(wordCard.el);
    });
  }
}
