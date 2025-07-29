export class InputManager {
  private keys: Set<string> = new Set();

  constructor() {
    this.bindEvents();
  }

  private bindEvents() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    this.keys.add(event.code);
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    this.keys.delete(event.code);
  };

  public isKeyPressed(keyCode: string): boolean {
    return this.keys.has(keyCode);
  }

  public update() {
    // 必要に応じて入力状態を更新
  }

  public destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
}