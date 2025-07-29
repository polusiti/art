interface Wall {
  x: number;
  y: number;
  width: number;
  height: number;
}

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

export class Gallery {
  private walls: Wall[] = [];
  private exhibits: Exhibit[] = [];

  constructor() {
    this.createGalleryLayout();
    this.createExhibits();
  }

  private createGalleryLayout() {
    // 外壁
    this.walls.push(
      { x: 0, y: 0, width: 1200, height: 20 }, // 上壁
      { x: 0, y: 0, width: 20, height: 800 }, // 左壁
      { x: 1180, y: 0, width: 20, height: 800 }, // 右壁
      { x: 0, y: 780, width: 1200, height: 20 }, // 下壁
    );

    // 内部の部屋の仕切り
    this.walls.push(
      { x: 400, y: 200, width: 20, height: 200 }, // 縦の仕切り1
      { x: 800, y: 200, width: 20, height: 200 }, // 縦の仕切り2
      { x: 200, y: 400, width: 400, height: 20 }, // 横の仕切り1
      { x: 600, y: 400, width: 400, height: 20 }, // 横の仕切り2
    );
  }

  private createExhibits() {
    this.exhibits = [
      {
        id: 'portfolio-website',
        x: 100,
        y: 100,
        width: 120,
        height: 80,
        title: 'Portfolio Website',
        description: 'A modern responsive portfolio built with Next.js and Three.js',
        image: '/portfolio-preview.jpg',
        type: 'website'
      },
      {
        id: 'ai-chatbot',
        x: 500,
        y: 100,
        width: 120,
        height: 80,
        title: 'AI Chatbot',
        description: 'Intelligent conversational AI with natural language processing',
        image: '/chatbot-preview.jpg',
        type: 'project'
      },
      {
        id: 'digital-art',
        x: 900,
        y: 100,
        width: 120,
        height: 80,
        title: 'Digital Art Collection',
        description: 'Abstract digital artworks created with procedural generation',
        image: '/art-preview.jpg',
        type: 'artwork'
      },
      {
        id: 'game-engine',
        x: 100,
        y: 500,
        width: 120,
        height: 80,
        title: '2D Game Engine',
        description: 'Custom JavaScript game engine with physics and rendering',
        image: '/engine-preview.jpg',
        type: 'project'
      },
      {
        id: 'data-viz',
        x: 500,
        y: 500,
        width: 120,
        height: 80,
        title: 'Data Visualization',
        description: 'Interactive dashboard for complex data analysis',
        image: '/dataviz-preview.jpg',
        type: 'project'
      },
      {
        id: 'vr-experience',
        x: 900,
        y: 500,
        width: 120,
        height: 80,
        title: 'VR Experience',
        description: 'Immersive virtual reality environment for education',
        image: '/vr-preview.jpg',
        type: 'project'
      }
    ];
  }

  public getWalls(): Wall[] {
    return this.walls;
  }

  public getExhibits(): Exhibit[] {
    return this.exhibits;
  }
}