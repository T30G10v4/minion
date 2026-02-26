import { Writing } from './writing.js';

export class Prelive {

  constructor(ctx, subtext = "La Live sta per iniziare..", width = 1920, height = 1080, color10 = "#FF002F", color30 = "#2F002F", text = "4ll1s0n") {

    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.color10 = color10;
    this.color30 = color30;

    this.time = 0;

    this.firstx = 0;
    this.firsty = 0;
    this.lastx = width;
    this.lasty = height;

    this.speed = 4;

    this.cycle1 = true;
    this.cycle2 = true;

    this.text = text;
    this.subtext = subtext;

  }

  draw() {

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.width, 0);
    this.ctx.lineTo(this.width, this.height);
    this.ctx.lineTo(0, this.height);
    this.ctx.closePath();

    if (this.cycle1 && this.cycle2) {

      this.firstx += this.speed;
      this.lastx -= this.speed;

      if (this.firstx >= this.width || this.lastx <= 0) {
        this.cycle1 = false;
      }

    } else if (!this.cycle1 && this.cycle2) {

      this.firsty += this.speed;
      this.lasty -= this.speed;

      if (this.firsty >= this.height || this.lasty <= 0) {
        this.cycle2 = false;
      }
    } else if (!this.cycle1 && !this.cycle2) {

      this.firstx -= this.speed;
      this.lastx += this.speed;

      if (this.firstx <= 0 || this.lastx >= this.width) {
        this.cycle1 = true;
      }

    } else if (this.cycle1 && !this.cycle2) {
      this.firsty -= this.speed;
      this.lasty += this.speed;

      if (this.firsty <= 0 || this.lasty >= this.height) {
        this.cycle2 = true;
      }

    }

    const gradient = this.ctx.createLinearGradient(this.firstx, this.firsty, this.lastx, this.lasty);


    gradient.addColorStop(0, this.color30);
    gradient.addColorStop(1, this.color10);

    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    const all1s0n = new Writing(this.ctx, this.width / 2, this.height / 3);
    const live = new Writing(this.ctx, this.width / 2, (this.height / 2), this.subtext, `50px 'Black Ops One', 'Stencil', 'Impact', sans-serif`, "center", "middle", "white", 5, "black");

    requestAnimationFrame(this.draw.bind(this));

  }
}