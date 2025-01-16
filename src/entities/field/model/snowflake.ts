class Snowflake {
  private x: number;
  private y: number;
  private xSpeed: number;
  private ySpeed: number;
  private startX: number;

  constructor(
    fieldWidth: number,
    fieldHeight: number,
    private baseXSpeed: number = 0
  ) {
    this.x = Math.random() * fieldWidth;
    this.y = Math.random() * -fieldHeight;
    this.startX = this.x;
    this.xSpeed = Math.random() * 2 - 1 + 0.25;
    this.ySpeed = Math.random() * 1 + 0.5;
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    const acceleration = (this.startX - this.x) / 500;
    this.xSpeed += acceleration;
    this.ySpeed += 0.001;
    this.startX += this.baseXSpeed;
  }

  getCords() {
    return { x: this.x, y: this.y };
  }
}

export { Snowflake };
