import './word-card.scss';
import BaseComponent from '../base/base-component';
import createElement from '../../shared/create-element';
import delay from '../../shared/delay';
import getAudio from '../../shared/get-audio';
import IWordCardProps from '../../types/word-card-props.type';
import { CARD_FLIP_CLASS, CARD_FLIP_DURATION } from '../../constants';

export default class WordCard extends BaseComponent {
  isFlipped = false;

  private readonly containerEl: HTMLElement;

  readonly frontEl: HTMLElement;

  private readonly backEl: HTMLElement;

  readonly wordEnEl: HTMLElement;

  private readonly wordRuEl: HTMLElement;

  readonly rotateEl: HTMLElement;

  private readonly audioEl: HTMLAudioElement;

  constructor(cardProps: IWordCardProps, categoryName: string) {
    super('div', ['word-card']);

    this.containerEl = createElement('div', ['word-card__container']);
    this.frontEl = createElement('div', ['word-card__front']);
    this.backEl = createElement('div', ['word-card__back']);

    this.wordEnEl = createElement('div', [
      'word-card__header',
      'word-card__header_contain',
    ]);
    this.wordRuEl = createElement('div', ['word-card__header']);

    this.rotateEl = createElement('span', ['word-card__rotate']);

    this.audioEl = getAudio(`category-cards/${categoryName}`, cardProps.audio);

    this.render(cardProps, categoryName);
  }

  private render(cardProps: IWordCardProps, categoryName: string): void {
    const bgImg = `background-image: url("${cardProps.image}")`;

    this.frontEl.setAttribute('style', bgImg);
    this.backEl.setAttribute('style', bgImg);

    this.frontEl.dataset.category = categoryName;
    this.frontEl.dataset.audio = cardProps.audio;

    this.wordEnEl.textContent = cardProps.word;
    this.wordRuEl.textContent = cardProps.translation;

    this.el.append(this.containerEl);
    this.containerEl.append(this.frontEl, this.backEl);

    this.frontEl.append(this.wordEnEl);
    this.wordEnEl.append(this.rotateEl);

    this.backEl.append(this.wordRuEl);
  }

  trainCard(): void {
    this.flipToBack();
    this.waitGoOutFromCard();
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
      this.el.classList.toggle(CARD_FLIP_CLASS, isFront);

      delay(CARD_FLIP_DURATION).then(resolve);
    });
  }

  private waitGoOutFromCard(): void {
    this.el.addEventListener(
      'mouseleave',
      () => {
        this.flipToFront();
      },
      { once: true },
    );
  }

  playAudio(): void {
    this.audioEl.play();
  }

  disableCard(): void {
    this.el.classList.add('word-card_disabled');
  }
}
