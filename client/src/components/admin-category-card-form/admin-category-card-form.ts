import './admin-category-card-form.scss';
import BaseComponent from '../base/base-component';
import Field from '../base/field/field';
import Btn from '../base/btn/btn';
import createElement from '../../shared/create-element';
import IAdminCategoryCardFormProps from '../../types/admin-category-card-form-props.type';

export default class AdminCategoryCardForm extends BaseComponent {
  private readonly label: HTMLElement;

  readonly field: Field;

  readonly btnCancel: Btn;

  readonly btnAct: Btn;

  constructor(props: IAdminCategoryCardFormProps) {
    super('form', props.formClasses.concat(['admin-category-card-form']));

    this.label = createElement('label', ['admin-category-card-form__label']);
    this.field = new Field({
      classes: ['admin-category-card-form__field'],
      type: 'text',
      name: 'name',
      maxlength: '30',
    });
    this.btnCancel = new Btn({
      classes: props.btnClasses.concat([
        'admin-category-card-form__btn-cancel',
        props.btnCancelClass,
      ]),
      text: 'Cancel',
    });
    this.btnAct = new Btn({
      classes: props.btnClasses.concat([
        'admin-category-card-form__btn-act',
        props.btnActClass,
      ]),
      text: props.btnActText,
    });

    this.render(props);
  }

  private render(props: IAdminCategoryCardFormProps): void {
    this.el.setAttribute('action', props.formAction);
    this.el.setAttribute('method', props.formMethod);

    this.label.textContent = 'Category Name:';

    if (props.inputValue) this.field.setValue(props.inputValue);

    this.el.append(
      this.label,
      this.field.el,
      this.btnCancel.el,
      this.btnAct.el,
    );
  }
}
