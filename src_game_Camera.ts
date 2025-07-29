import { Player } from './Player';

export class Camera {
  public x = 0;
  public y = 0;
  public width: number;
  public height: number;
  private target: Player | null = null;
  private smoothing = 0.1;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public follow(target: Player) {
    this.target = target;
  }

  public update(deltaTime: number) {
    if (!this.target) return;

    const targetX = this.target.x - this.width / 2;
    const targetY = this.target.y - this.height / 2;

    this.x += (targetX - this.x) * this.smoothing;
    this.y += (targetY - this.y) * this.smoothing;
  }

  public worldToScreen(worldX: number, worldY: number) {
    return {
      x: worldX - this.x,
      y: worldY - this.y
    };
  }
}