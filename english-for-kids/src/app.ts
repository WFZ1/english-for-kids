import router from './components/base/router';

export default class App {
  constructor(private readonly rootEl: HTMLElement) {}

  // private render(): void {}

  private clearMainEl(): void {
    this.rootEl.innerHTML = '';
  }

  addRoutes(): void {
    router.add('', () => {
      this.clearMainEl();
    });
  }
}
