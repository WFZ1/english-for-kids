import './footer.scss';
import BaseComponent from '../base/base-component';
import Link from '../base/link/link';
import createElement from '../../shared/create-element';
import { MY_GITHUB, RSSCHOOL_JS_LINK, YEAR_CREATE_APP } from '../../constants';

class Footer extends BaseComponent {
  private readonly containerEl: HTMLElement;

  private readonly githubLinkEl: Link;

  private readonly rssLinkEl: Link;

  private readonly rssYearEl: HTMLElement;

  constructor() {
    super('footer', ['footer']);

    this.containerEl = createElement('div', ['footer__container']);
    this.githubLinkEl = new Link({
      classes: ['footer__github'],
      url: MY_GITHUB.url,
      text: MY_GITHUB.name,
      target: '_blank',
    });
    this.rssLinkEl = new Link({
      classes: ['footer__rsschool'],
      url: RSSCHOOL_JS_LINK,
      target: '_blank',
    });
    this.rssYearEl = createElement('span', ['footer__rsschool-year']);

    this.render();
  }

  private render(): void {
    this.rssYearEl.textContent = YEAR_CREATE_APP;

    this.el.append(this.containerEl);
    this.containerEl.append(this.githubLinkEl.el, this.rssLinkEl.el);
    this.rssLinkEl.el.append(this.rssYearEl);
  }
}

const footer = new Footer();
export default footer;
