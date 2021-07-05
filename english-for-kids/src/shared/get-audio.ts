export default function getAudio(
  category: string,
  audio: string,
): HTMLAudioElement {
  const src = `assets/audio/${category}/${audio}`;
  return new Audio(src);
}
