export default function handleizeString(str: string): string {
  let newStr = str.toLowerCase();

  newStr = newStr.replace(/\W/g, (char) => {
    if (char === ' ') return '-';

    return '';
  });

  return newStr
}
