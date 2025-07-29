import { Camera } from './Camera';
import { Gallery } from './Gallery';
import { Player } from './Player';

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private camera: Camera;

  constructor(ctx: CanvasRenderingContext2D, camera: Camera) {
    this.ctx = ctx;
    this.camera = camera;
  }

  public clear() {
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(0, 0, this.camera.width, this.camera.height);
  }

  public renderGallery(gallery: Gallery) {
    // 床のレンダリング
    this.ctx.fillStyle = '#2d2d2d';
    this.ctx.fillRect(0, 0, this.camera.width, this.camera.height);

    // グリッドパターン
    this.renderGrid();

    // 壁のレンダリング
    this.ctx.fillStyle = '#404040';
    gallery.getWalls().forEach(wall => {
      const screenPos = this.camera.worldToScreen(wall.x, wall.y);
      this.ctx.fillRect(screenPos.x, screenPos.y, wall.width, wall.height);
    });

    // 展示物のレンダリング
    gallery.getExhibits().forEach(exhibit => {
      this.renderExhibit(exhibit);
    });
  }

  private renderGrid() {
    this.ctx.strokeStyle = '#333333';
    this.ctx.lineWidth = 1;

    const gridSize = 50;
    const startX = Math.floor(this.camera.x / gridSize) * gridSize;
    const startY = Math.floor(this.camera.y / gridSize) * gridSize;

    for (let x = startX; x < this.camera.x + this.camera.width; x += gridSize) {
      const screenX = x - this.camera.x;
      this.ctx.beginPath();
      this.ctx.moveTo(screenX, 0);
      this.ctx.lineTo(screenX, this.camera.height);
      this.ctx.stroke();
    }

    for (let y = startY; y < this.camera.y + this.camera.height; y += gridSize) {
      const screenY = y - this.camera.y;
      this.ctx.beginPath();
      this.ctx.moveTo(0, screenY);
      this.ctx.lineTo(this.camera.width, screenY);
      this.ctx.stroke();
    }
  }

  private renderExhibit(exhibit: any) {
    const screenPos = this.camera.worldToScreen(exhibit.x, exhibit.y);
    
    // 展示フレーム
    this.ctx.fillStyle = '#d4af37';
    this.ctx.fillRect(screenPos.x - 5, screenPos.y - 5, exhibit.width + 10, exhibit.height + 10);
    
    // 展示内容
    this.ctx.fillStyle = '#f5f5f0';
    this.ctx.fillRect(screenPos.x, screenPos.y, exhibit.width, exhibit.height);
    
    // タイトル
    this.ctx.fillStyle = '#2d2d2d';
    this.ctx.font = '12px Inter';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      exhibit.title, 
      screenPos.x + exhibit.width / 2, 
      screenPos.y + exhibit.height / 2
    );
  }

  public renderPlayer(player: Player) {
    const screenPos = this.camera.worldToScreen(player.x, player.y);
    
    // プレイヤーの影
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    this.ctx.beginPath();
    this.ctx.ellipse(
      screenPos.x + player.width / 2,
      screenPos.y + player.height + 5,
      player.width / 2,
      5,
      0,
      0,
      Math.PI * 2
    );
    this.ctx.fill();

    // プレイヤー本体
    this.ctx.fillStyle = '#4a90e2';
    this.ctx.fillRect(screenPos.x, screenPos.y, player.width, player.height);
    
    // 方向を示す矢印
    const centerX = screenPos.x + player.width / 2;
    const centerY = screenPos.y + player.height / 2;
    
    this.ctx.fillStyle = '#ffffff';
    this.ctx.save();
    this.ctx.translate(centerX, centerY);
    
    const direction = player.getDirection();
    const angle = {
      'up': -Math.PI / 2,
      'down': Math.PI / 2,
      'left': Math.PI,
      'right': 0
    }[direction] || 0;
    
    this.ctx.rotate(angle);
    this.ctx.beginPath();
    this.ctx.moveTo(8, 0);
    this.ctx.lineTo(-4, -4);
    this.ctx.lineTo(-4, 4);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }

  public renderUI() {
    // 操作説明
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(20, 20, 300, 80);
    
    this.ctx.fillStyle = '#f5f5f0';
    this.ctx.font = '14px Inter';
    this.ctx.textAlign = 'left';
    this.ctx.fillText('WASD or Arrow Keys: Move', 30, 45);
    this.ctx.fillText('Space: Interact with exhibits', 30, 65);
    this.ctx.fillText('ESC: Close modal', 30, 85);
  }
}