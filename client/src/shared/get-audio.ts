export default function getAudio(
  folder: string,
  audio: string,
): HTMLAudioElement {
  const src = `assets/audio/${folder}/${audio}`;
  return new Audio(src);
}
