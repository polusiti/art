import { InputManager } from './InputManager';

export class Player {
  public x: number;
  public y: number;
  public width = 32;
  public height = 32;
  public speed = 200;
  private velocityX = 0;
  private velocityY = 0;
  private direction = 'down';
  private isWalking = false;
  private animationTime = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public update(deltaTime: number, input: InputManager) {
    this.handleInput(input);
    this.updatePosition(deltaTime);
    this.updateAnimation(deltaTime);
  }

  private handleInput(input: InputManager) {
    this.velocityX = 0;
    this.velocityY = 0;
    this.isWalking = false;

    if (input.isKeyPressed('ArrowLeft') || input.isKeyPressed('KeyA')) {
      this.velocityX = -this.speed;
      this.direction = 'left';
      this.isWalking = true;
    }
    if (input.isKeyPressed('ArrowRight') || input.isKeyPressed('KeyD')) {
      this.velocityX = this.speed;
      this.direction = 'right';
      this.isWalking = true;
    }
    if (input.isKeyPressed('ArrowUp') || input.isKeyPressed('KeyW')) {
      this.velocityY = -this.speed;
      this.direction = 'up';
      this.isWalking = true;
    }
    if (input.isKeyPressed('ArrowDown') || input.isKeyPressed('KeyS')) {
      this.velocityY = this.speed;
      this.direction = 'down';
      this.isWalking = true;
    }

    // 斜め移動の正規化
    if (this.velocityX !== 0 && this.velocityY !== 0) {
      const length = Math.sqrt(this.velocityX * this.velocityX + this.velocityY * this.velocityY);
      this.velocityX = (this.velocityX / length) * this.speed;
      this.velocityY = (this.velocityY / length) * this.speed;
    }
  }

  private updatePosition(deltaTime: number) {
    this.x += this.velocityX * deltaTime;
    this.y += this.velocityY * deltaTime;
  }

  private updateAnimation(deltaTime: number) {
    if (this.isWalking) {
      this.animationTime += deltaTime * 8; // アニメーション速度
    } else {
      this.animationTime = 0;
    }
  }

  public getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  public getDirection() {
    return this.direction;
  }

  public getIsWalking() {
    return this.isWalking;
  }

  public getAnimationFrame() {
    return Math.floor(this.animationTime) % 4;
  }
}