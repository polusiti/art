import { Player } from './Player';
import { useGalleryStore } from '@/stores/galleryStore';

interface Exhibit {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  description: string;
  image: string;
  type: 'website' | 'project' | 'artwork';
}

export class ExhibitSystem {
  private interactionDistance = 80;

  public checkInteractions(player: Player, exhibits: Exhibit[]) {
    const playerBounds = player.getBounds();
    const playerCenterX = playerBounds.x + playerBounds.width / 2;
    const playerCenterY = playerBounds.y + playerBounds.height / 2;

    for (const exhibit of exhibits) {
      const exhibitCenterX = exhibit.x + exhibit.width / 2;
      const exhibitCenterY = exhibit.y + exhibit.height / 2;

      const distance = Math.sqrt(
        Math.pow(playerCenterX - exhibitCenterX, 2) +
        Math.pow(playerCenterY - exhibitCenterY, 2)
      );

      if (distance <= this.interactionDistance) {
        // プレイヤーが展示物の近くにいる場合の処理
        this.showInteractionHint(exhibit);
      }
    }
  }

  private showInteractionHint(exhibit: Exhibit) {
    // インタラクションヒントを表示
    // スペースキーが押されたら展示物を開く
    const handleSpaceKey = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        useGalleryStore.getState().openExhibit(exhibit);
        window.removeEventListener('keydown', handleSpaceKey);
      }
    };

    window.addEventListener('keydown', handleSpaceKey);
    
    // 一定時間後にイベントリスナーを削除
    setTimeout(() => {
      window.removeEventListener('keydown', handleSpaceKey);
    }, 100);
  }
}