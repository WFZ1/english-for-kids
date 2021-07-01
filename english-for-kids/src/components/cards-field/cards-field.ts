import './cards-field.scss';
import BaseComponent from '../base/base-component';
import WordCard from '../word-card/word-card';
import store from '../base/store';
import getAudio from '../../shared/get-audio';
import getContainEl from '../../shared/get-contain-el';
import IWordCardProps from '../../types/word-card-props.type';
import { GAME_CARDS_SOUND_NOTICES, GAME_CARD_CORRECT, GAME_CARD_ERROR, TRAIN } from '../../constants';

export default class CardsField extends BaseComponent {
  cards: WordCard[] = [];

  private readonly audioCorrect: HTMLAudioElement;

  private readonly audioError: HTMLAudioElement;

  constructor() {
    super('div', ['cards-field']);

    this.audioCorrect = getAudio(GAME_CARDS_SOUND_NOTICES.correct.folder, GAME_CARDS_SOUND_NOTICES.correct.audio);
    this.audioError = getAudio(GAME_CARDS_SOUND_NOTICES.error.folder, GAME_CARDS_SOUND_NOTICES.error.audio);

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

  private trainCard(e: MouseEvent): void {
    let card = this.getCard(e, '.word-card__rotate');

    if (card) {
      card.trainCard();
    }
    else {
      card = this.getCard(e, '.word-card__front');

      if (card && !card.isFlipped) card.playAudio();
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
        this.execActionsWrongCard();
      }
    }
  }

  private execActionsCorrectCard(card: WordCard): void {
    this.audioCorrect.play();
    card.disableCard();
    store.dispatch({ type: GAME_CARD_CORRECT });
  }

  private execActionsWrongCard(): void {
    this.audioError.play();
    store.dispatch({ type: GAME_CARD_ERROR });
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

  private clear(): void {
    this.cards = [];
    this.el.innerHTML = '';
  }

  addCards(wordCards: IWordCardProps[], categoryName: string): void {
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
