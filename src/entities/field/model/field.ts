import { Snowflake } from './snowflake';

class Field {
  private snowflakes: Set<Snowflake> = new Set();
  private isStarted: boolean = false;

  constructor(
    private baseXSpeed: number = 0,
    private snowflakeCount: number = 30
  ) {}

  private initSnowflakes(canvas: HTMLCanvasElement) {
    for (let i = 0; i < this.snowflakeCount; i++) {
      this.snowflakes.add(new Snowflake(canvas.width, canvas.height, this.baseXSpeed));
    }
  }

  private render(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    this.snowflakes.forEach((snowflake) => {
      context?.beginPath();
      const { x, y } = snowflake.getCords();
      context!.strokeStyle = '#EEE';
      context!.font = '20px Arial';
      context?.strokeText('*', x, y);
    });
  }

  private tick(canvas: HTMLCanvasElement) {
    this.snowflakes.forEach((snowflake) => {
      if (!canvas) {
        this.snowflakes.delete(snowflake);
        return;
      }

      if (snowflake.getCords().y > canvas.height) {
        this.snowflakes.delete(snowflake);
        this.snowflakes.add(new Snowflake(canvas.width, 10, this.baseXSpeed));
        return;
      }
      snowflake.move();
    });
    this.render(canvas);
    if (this.isStarted) {
      requestAnimationFrame(this.tick.bind(this, canvas));
    }
  }

  start(canvas: HTMLCanvasElement) {
    this.clear();
    this.initSnowflakes(canvas);
    this.isStarted = true;
    this.tick(canvas);
  }

  stop() {
    this.isStarted = false;
  }

  clear() {
    this.snowflakes.clear();
  }
}

export { Field };
