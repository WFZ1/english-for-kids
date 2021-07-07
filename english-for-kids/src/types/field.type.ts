export default interface IField {
  classes: string[];
  type: string;
  name: string;
  placeholder: string;
  maxlength: string;
  required?: boolean;
  pattern?: RegExp;
}
