import './field.scss';
import BaseComponent from '../base-component';
import createElement from '../../../shared/create-element';
import IField from '../../../types/field.type';

export default class Field extends BaseComponent {
  private readonly input: HTMLInputElement;

  constructor(props: IField) {
    super('div', props.classes.concat(['field']));

    this.input = createElement('input', ['field__input']) as HTMLInputElement;

    this.render(props);
  }

  private render(props: IField): void {
    this.input.setAttribute('type', props.type);
    this.input.setAttribute('name', props.name);
    this.input.setAttribute('maxlength', props.maxlength);

    if (props.placeholder) this.input.setAttribute('placeholder', props.placeholder);

    if (props.value) this.input.setAttribute('value', props.value);

    if (props.required) this.input.setAttribute('required', '');

    if (props.pattern) {
      const regexStr = props.pattern.toString();
      const pattern = regexStr.substring(1, regexStr.length - 1);
      this.input.setAttribute('pattern', pattern);
    }

    this.el.append(this.input);
  }

  setValue(value: string): void {
    this.input.setAttribute('value', value);
  }

  getValue(): string {
    return this.input.value;
  }
}
