import './word-card.scss';
import BaseComponent from '../base/base-component';
import IWordCard from '../../types/word-card.type';
import delay from '../../shared/delay';
import createElement from '../../shared/create-element';
import { FLIP_CLASS } from '../../constants';

export default class WordCard extends BaseComponent {
  isFlipped = false;

  isDisabled = false;

  readonly flipDuration = 250;

  private readonly containerEl: HTMLElement;

  readonly frontEl: HTMLElement;

  private readonly backEl: HTMLElement;

  private readonly wordEnEl: HTMLElement;

  private readonly wordRuEl: HTMLElement;

  readonly rotateEl: HTMLElement;

  constructor(cardProps: IWordCard, categoryName: string) {
    super('div', ['word-card']);

    this.containerEl = createElement('div', ['word-card__container']);
    this.frontEl = createElement('div', ['word-card__front']);
    this.backEl = createElement('div', ['word-card__back']);

    this.wordEnEl = createElement('div', ['word-card__header', 'word-card__header_contain']);
    this.wordRuEl = createElement('div', ['word-card__header']);

    this.rotateEl = createElement('span', ['word-card__rotate',]);

    this.render(cardProps, categoryName);
  }

  private render(cardProps: IWordCard, categoryName: string): void {
    const bgImg = `background-image: url("${ cardProps.image }")`;

    this.frontEl.setAttribute('style', bgImg);
    this.backEl.setAttribute('style', bgImg);

    this.frontEl.dataset.category = categoryName;
    this.frontEl.dataset.audio = cardProps.audio;

    this.wordEnEl.textContent = cardProps.word;
    this.wordRuEl.textContent = cardProps.translation;

    this.el.append(this.containerEl);
    this.containerEl.append(this.frontEl, this.backEl);

    this.frontEl.append(this.wordEnEl, this.rotateEl);
    this.backEl.append(this.wordRuEl);
  }

  trainCard(card: WordCard): void {
    card.flipToBack();
    this.waitGoOutFromCard(card);
  }

  private waitGoOutFromCard(card: WordCard): void {
    card.el.addEventListener('mouseleave', () => {
      this.flipToFront();
    }, { once: true });
  }

  flipToBack(): Promise<void> {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipToFront(): Promise<void> {
    this.isFlipped = false;
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.el.classList.toggle(FLIP_CLASS, isFront);

      delay(this.flipDuration).then(resolve);
    });
  }

  static playAudio(src: string): void {
    const audio = new Audio(src);
    audio.play();
  }
}
