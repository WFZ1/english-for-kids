import './admin-words-field.scss';
import BaseComponent from '../base/base-component';
import AdminWordCard from '../admin-word-card/admin-word-card';
import IWordCardProps from '../../types/word-card-props.type';
import NewCard from '../new-card/new-card';

export default class AdminWordsField extends BaseComponent {
  cards: Array<AdminWordCard | NewCard> = [];

  private readonly newCard: NewCard;

  constructor() {
    super('div', ['admin-words-field']);

    this.newCard = new NewCard(['admin-words-field__new-card'], 'Add new word');
  }

  clear(): void {
    this.cards = [];
    this.el.innerHTML = '';
  }

  addCards(wordCards: IWordCardProps[]): void {
    wordCards.forEach((cardProps) => {
      const wordCard = new AdminWordCard(cardProps);

      this.cards.push(wordCard);
      this.el.append(wordCard.el);
    });

    this.cards.push(this.newCard);
    this.el.append(this.newCard.el);
  }
}
