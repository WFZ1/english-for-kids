import './cards-field.scss';
import BaseComponent from '../base/base-component';
import IWordCard from '../../types/word-card.type';
import WordCard from '../word-card/word-card';
import getContainEl from '../../shared/get-contain-el';

export default class CardsField extends BaseComponent {
  private cards: WordCard[] = [];

  constructor() {
    super('div', ['cards-field']);
    this.attachListener();
  }

  private clear(): void {
    this.cards = [];
    this.el.innerHTML = '';
  }

  private attachListener(): void {
    this.el.addEventListener('click', (e) =>
      this.handleToField(e),
    );
  }

  private handleToField(e: MouseEvent): void {
    const el = getContainEl(e.target as HTMLElement, '.word-card__rotate', this.el);

    if (el) {
      const pointer = this.cards.find((card) => card.rotateEl === el);
      if (pointer) pointer.trainCard(pointer);
    }
  }

  addCards(wordCards: IWordCard[], categoryName: string): void {
    this.clear();

    wordCards.forEach((cardProps) => {
      const newCardProps = { ...cardProps };
      newCardProps.image = `assets/images/category-cards/${ categoryName }/${ cardProps.image }`

      const wordCard = new WordCard(newCardProps);

      this.cards.push(wordCard);
      this.el.append(wordCard.el);
    });
  }
}
