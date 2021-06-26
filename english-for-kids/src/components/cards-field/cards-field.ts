import './cards-field.scss';
import BaseComponent from '../base/base-component';
import WordCard from '../word-card/word-card';
import IWordCard from '../../types/word-card.type';
import getContainEl from '../../shared/get-contain-el';

export default class CardsField extends BaseComponent {
  private cards: WordCard[] = [];

  constructor() {
    super('div', ['cards-field']);
    this.attachListener();
  }

  private attachListener(): void {
    this.el.addEventListener('click', (e) =>
      this.handleField(e),
    );
  }

  private clear(): void {
    this.cards = [];
    this.el.innerHTML = '';
  }

  private handleField(e: MouseEvent): void {
    const rotateEl = this.getCard(e, '.word-card__rotate');

    if (rotateEl) rotateEl.trainCard(rotateEl);
    else {
      const cardFrontEl = this.getCard(e, '.word-card__front');

      if (cardFrontEl && !cardFrontEl.isFlipped) {
        const src = `assets/audio/${ cardFrontEl.frontEl.dataset.category }/${ cardFrontEl.frontEl.dataset.audio }`
        WordCard.playAudio(src);
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
