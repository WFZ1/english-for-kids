export default interface IRout {
  path: string | RegExp;
  callback: (props: RegExpMatchArray) => void;
}
