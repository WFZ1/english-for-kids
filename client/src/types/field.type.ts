export default interface IField {
  classes: string[];
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  maxlength: string;
  required?: boolean;
  pattern?: RegExp;
}
