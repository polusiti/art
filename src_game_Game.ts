import { Player } from './Player';
import { Gallery } from './Gallery';
import { InputManager } from './InputManager';
import { Camera } from './Camera';
import { Renderer } from './Renderer';
import { CollisionSystem } from './CollisionSystem';
import { ExhibitSystem } from './ExhibitSystem';
import { useGalleryStore } from '@/stores/galleryStore';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private gallery: Gallery;
  private inputManager: InputManager;
  private camera: Camera;
  private renderer: Renderer;
  private collisionSystem: CollisionSystem;
  private exhibitSystem: ExhibitSystem;
  private isRunning = false;
  private lastTime = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');
    this.ctx = ctx;

    this.setupCanvas();
    this.initializeSystems();
  }

  private setupCanvas() {
    const resizeCanvas = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }

  private initializeSystems() {
    this.inputManager = new InputManager();
    this.player = new Player(400, 300);
    this.gallery = new Gallery();
    this.camera = new Camera(this.canvas.width, this.canvas.height);
    this.renderer = new Renderer(this.ctx, this.camera);
    this.collisionSystem = new CollisionSystem();
    this.exhibitSystem = new ExhibitSystem();

    // カメラをプレイヤーに追従させる
    this.camera.follow(this.player);
  }

  public start() {
    this.isRunning = true;
    this.gameLoop(0);
  }

  public stop() {
    this.isRunning = false;
  }

  public destroy() {
    this.stop();
    this.inputManager.destroy();
  }

  private gameLoop = (currentTime: number) => {
    if (!this.isRunning) return;

    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame(this.gameLoop);
  };

  private update(deltaTime: number) {
    this.inputManager.update();
    this.player.update(deltaTime, this.inputManager);
    this.camera.update(deltaTime);
    
    // 衝突検出
    this.collisionSystem.checkCollisions(this.player, this.gallery.getWalls());
    
    // 展示物との相互作用チェック
    this.exhibitSystem.checkInteractions(this.player, this.gallery.getExhibits());
  }

  private render() {
    this.renderer.clear();
    this.renderer.renderGallery(this.gallery);
    this.renderer.renderPlayer(this.player);
    this.renderer.renderUI();
  }
}