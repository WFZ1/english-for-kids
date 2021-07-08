import './login-popup.scss';
import Popup from '../base/popup/popup';
import LoginForm from '../login-form/login-form';
import createElement from '../../shared/create-element';
import { LOGIN_POPUP_SHOW_CLASS } from '../../constants';

export default class LoginPopup extends Popup {
  private readonly titleEl: HTMLElement;

  private readonly form: LoginForm;

  constructor() {
    super(['login-popup'], 'login-popup__container');

    this.titleEl = createElement('h3', ['login-popup__title']);
    this.form = new LoginForm(['login-popup__form'], this);

    this.render();
  }

  private render(): void {
    this.titleEl.textContent = 'Login';

    this.containerEl.append(this.titleEl, this.form.el);
  }

  protected checkClickIsOutside(e: Event): void {
    if (e.target === this.el) document.body.classList.remove(LOGIN_POPUP_SHOW_CLASS);
  }
}
