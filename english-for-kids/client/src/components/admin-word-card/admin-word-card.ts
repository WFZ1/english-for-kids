import './admin-word-card.scss';
import BaseComponent from '../base/base-component';
import Btn from '../base/btn/btn';
import createElement from '../../shared/create-element';
import getAudio from '../../shared/get-audio';
import IWordCardProps from '../../types/word-card-props.type';

export default class AdminWordCard extends BaseComponent {
  private readonly containerEl: HTMLElement;

  private readonly removeEl: HTMLElement;

  private readonly wordEl: HTMLElement;

  private readonly translationEl: HTMLElement;

  private readonly audioNameEl: HTMLElement;

  private readonly audioFileEl: HTMLAudioElement;

  private readonly imageEl: HTMLElement;

  private readonly btnChange: Btn;

  constructor(cardProps: IWordCardProps, categoryName: string) {
    super('div', ['admin-word-card']);

    this.containerEl = createElement('div', ['admin-word-card__container']);
    this.removeEl = createElement('span', ['admin-word-card__remove']);
    this.wordEl = createElement('span', ['admin-word-card__word']);
    this.translationEl = createElement('span', ['admin-word-card__translation']);
    this.audioNameEl = createElement('span', ['admin-word-card__audio']);
    this.audioFileEl = getAudio(`category-cards/${categoryName}`, cardProps.audio);
    this.imageEl = createElement('img', ['admin-word-card__img']);

    this.btnChange = new Btn({ classes: ['admin-word-card__btn', 'admin-word-card__btn-change'], text: 'Change' });

    this.render(cardProps);
  }

  private render(cardProps: IWordCardProps): void {
    this.wordEl.textContent = cardProps.word;
    this.createRow('Word:', this.wordEl);

    this.translationEl.textContent = cardProps.translation;
    this.createRow('Translation:', this.translationEl);

    this.audioNameEl.textContent = cardProps.audio;
    this.createRow('Sound file:', this.audioNameEl);

    this.imageEl.setAttribute('src', cardProps.image);
    this.createRow('Image:', this.imageEl);

    this.el.append(this.containerEl);
    this.containerEl.prepend(this.removeEl);
    this.containerEl.append(this.btnChange.el);
  }

  private createRow(text: string, cardEl: HTMLElement): void {
    const block = createElement('div', ['admin-word-card__block']);

    const subtitle = createElement('span', ['admin-word-card__subtitle']);
    subtitle.textContent = text;
    cardEl.classList.add('admin-word-card__value');

    this.containerEl.append(block);
    block.append(subtitle, cardEl);
  }

  playAudio(): void {
    this.audioFileEl.play();
  }
}
