import './login-form.scss';
import BaseComponent from '../base/base-component';
import Field from '../base/field/field';
import Btn from '../base/btn/btn';
import type LoginPopup from '../login-popup/login-popup';
import { LOGIN_FORM_CANCEL_BTN, LOGIN_FORM_LOGIN_FIELD, LOGIN_FORM_PASSWORD_FIELD, LOGIN_FORM_SUBMIT_BTN } from '../../constants';

export default class LoginForm extends BaseComponent {
  private readonly login: Field;

  private readonly password: Field;

  private readonly cancel: Btn;

  private readonly submit: Btn;

  constructor(classes: string[] = [], private readonly popup: LoginPopup) {
    super('form', classes.concat(['login-form']));

    this.login = new Field({
      ...LOGIN_FORM_LOGIN_FIELD,
      classes: ['login-form__field', 'login-form__login']
    });

    this.password = new Field({
      ...LOGIN_FORM_PASSWORD_FIELD,
      classes: ['login-form__field', 'login-form__password'],
    });

    this.cancel = new Btn({
      ...LOGIN_FORM_CANCEL_BTN,
      classes: ['btn', 'login-form__btn', 'login-form__cancel']
    });

    this.submit = new Btn({
      ...LOGIN_FORM_SUBMIT_BTN,
      classes: ['btn', 'login-form__btn', 'login-form__submit']
    });

    this.render();
  }

  private render(): void {
    // this.submit.attachHandler(() => {});

    this.el.append(this.login.el, this.password.el, this.cancel.el, this.submit.el);
  }
}
