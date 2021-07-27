import './game-score.scss';
import BaseComponent from '../base/base-component';
import createElement from '../../shared/create-element';

export default class GameScore extends BaseComponent {
  constructor(classes: string[] = []) {
    super('div', classes.concat(['game-score']));
  }

  private addStar(className: string) {
    const star = createElement('span', ['game-score__star', className]);
    this.el.append(star);
  }

  success(): void {
    this.addStar('game-score__star-success');
  }

  error(): void {
    this.addStar('game-score__star-error');
  }

  reset(): void {
    this.el.innerHTML = '';
  }
}
