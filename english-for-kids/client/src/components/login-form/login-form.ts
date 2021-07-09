import './login-form.scss';
import BaseComponent from '../base/base-component';
import Field from '../base/field/field';
import Btn from '../base/btn/btn';
import createElement from '../../shared/create-element';
import router from '../base/router';
import type LoginPopup from '../login-popup/login-popup';
import { AUTHORIZATION_URL, LOGIN_FORM_CANCEL_BTN, LOGIN_FORM_USERNAME_FIELD, LOGIN_FORM_PASSWORD_FIELD, LOGIN_FORM_SUBMIT_BTN, LOGIN_POPUP_SHOW_CLASS } from '../../constants';

export default class LoginForm extends BaseComponent {
  private readonly username: Field;

  private readonly password: Field;

  private readonly errorEl: HTMLElement;

  private readonly cancel: Btn;

  private readonly submit: Btn;

  constructor(classes: string[] = [], private readonly popup: LoginPopup) {
    super('form', classes.concat(['login-form']));

    this.username = new Field({
      ...LOGIN_FORM_USERNAME_FIELD,
      classes: ['login-form__field', 'login-form__username']
    });

    this.password = new Field({
      ...LOGIN_FORM_PASSWORD_FIELD,
      classes: ['login-form__field', 'login-form__password'],
    });

    this.errorEl = createElement('p', ['login-form__error', 'login-form__error_hidden']);

    this.cancel = new Btn({
      ...LOGIN_FORM_CANCEL_BTN,
      classes: ['btn', 'login-form__btn', 'login-form__cancel']
    });

    this.submit = new Btn({
      ...LOGIN_FORM_SUBMIT_BTN,
      classes: ['btn', 'login-form__btn', 'login-form__submit']
    });

    this.attachListener();
    this.render();
  }

  private render(): void {
    this.el.setAttribute('action', AUTHORIZATION_URL);
    this.el.setAttribute('method', 'post');

    this.cancel.attachHandler(this.handleCancel.bind(this));

    this.el.append(this.username.el, this.password.el, this.errorEl, this.cancel.el, this.submit.el);
  }

  private attachListener(): void {
    this.el.addEventListener('submit', (e) => this.handleForm(e));
  }

  private handleCancel(): void {
    this.errorEl.classList.add('login-form__error_hidden');
  }

  private handleForm(e: Event): void {
    e.preventDefault();
    this.authorization();
  }

  private async authorization(): Promise<void> {
    const formData = new FormData(this.el as HTMLFormElement);
    const data = [...formData.entries()];
    const serializeData = data
        .map(entry => `${ encodeURIComponent(entry[0]) }=${ encodeURIComponent(entry[1] as string) }`)
        .join('&');

    const response = await fetch(AUTHORIZATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: serializeData
    });

    const respData = await response.json();

    if ('accessToken' in respData) {
      this.errorEl.classList.add('login-form__error_hidden');
      document.body.classList.remove(LOGIN_POPUP_SHOW_CLASS);
      router.navigate('/');
      localStorage.setItem('authToken', respData.accessToken);
    } else {
      this.errorEl.textContent = respData.error;
      this.errorEl.classList.remove('login-form__error_hidden');
    }
  }
}
