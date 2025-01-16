import { Snowflake } from './snowflake';

class Field {
  private snowflakes: Set<Snowflake> = new Set();
  private isStarted: boolean = false;
  private context: CanvasRenderingContext2D | null = null;

  constructor(
    private canvas: HTMLCanvasElement,
    private baseXSpeed: number = 0,
    private snowflakeCount: number = 30
  ) {
    this.context = this.canvas.getContext('2d');
    this.initSnowflakes();
  }

  private initSnowflakes() {
    for (let i = 0; i < this.snowflakeCount; i++) {
      this.snowflakes.add(new Snowflake(this.canvas.width, this.canvas.height, this.baseXSpeed));
    }
  }

  private render() {
    if (!this.context) return;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.snowflakes.forEach((snowflake) => {
      this.context?.beginPath();
      const { x, y } = snowflake.getCords();
      this.context!.strokeStyle = '#EEE';
      this.context!.font = '20px Arial';
      this.context?.strokeText('*', x, y);
    });
  }

  private tick() {
    this.snowflakes.forEach((snowflake) => {
      if (snowflake.getCords().y > this.canvas.height) {
        this.snowflakes.delete(snowflake);
        this.snowflakes.add(new Snowflake(this.canvas.width, 10, this.baseXSpeed));
        return;
      }
      snowflake.move();
    });
    this.render();
    if (this.isStarted) {
      requestAnimationFrame(this.tick.bind(this));
    }
  }

  start() {
    this.clear();
    this.initSnowflakes();
    this.isStarted = true;
    this.tick();
  }

  stop() {
    this.isStarted = false;
  }

  clear() {
    this.snowflakes.clear();
  }
}

export { Field };
