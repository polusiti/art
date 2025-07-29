import { Player } from './Player';

interface Wall {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class CollisionSystem {
  public checkCollisions(player: Player, walls: Wall[]) {
    const playerBounds = player.getBounds();

    for (const wall of walls) {
      if (this.isColliding(playerBounds, wall)) {
        this.resolveCollision(player, wall);
      }
    }
  }

  private isColliding(rect1: any, rect2: any): boolean {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  private resolveCollision(player: Player, wall: Wall) {
    const playerBounds = player.getBounds();
    
    // 最も近い境界を見つけて押し戻す
    const overlapLeft = (playerBounds.x + playerBounds.width) - wall.x;
    const overlapRight = (wall.x + wall.width) - playerBounds.x;
    const overlapTop = (playerBounds.y + playerBounds.height) - wall.y;
    const overlapBottom = (wall.y + wall.height) - playerBounds.y;

    const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

    if (minOverlap === overlapLeft) {
      player.x = wall.x - playerBounds.width;
    } else if (minOverlap === overlapRight) {
      player.x = wall.x + wall.width;
    } else if (minOverlap === overlapTop) {
      player.y = wall.y - playerBounds.height;
    } else if (minOverlap === overlapBottom) {
      player.y = wall.y + wall.height;
    }
  }
}