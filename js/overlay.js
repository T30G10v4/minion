import { Polygon } from './polygon.js';
import { Writing } from './writing.js';

export class Overlay {

  constructor(ctx, width, height, color10, color30, thickness, color30fill, text, font) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.color10 = color10;
    this.color30 = color30;
    this.thickness = thickness;
    this.color30fill = color30fill;
    this.text = text;
    this.font = font;

    this.time = 0;

    this.firstx = 0;
    this.firsty = 0;
    this.lastx = width;
    this.lasty = height;

    this.speed = 4;

    this.cycle1 = true;
    this.cycle2 = true;

  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.beginPath();
    //1
    this.ctx.moveTo(0, 0);

    this.ctx.lineTo(this.width, 0);
    this.ctx.lineTo(this.width, this.height);
    this.ctx.lineTo(0, this.height);
    this.ctx.lineTo(0, this.thickness);
    this.ctx.lineTo(this.thickness, this.thickness);
    this.ctx.lineTo(this.thickness, this.height - this.thickness);
    this.ctx.lineTo(this.width - this.thickness, this.height - this.thickness);
    this.ctx.lineTo(this.width - this.thickness, this.thickness);
    this.ctx.lineTo(0, this.thickness);

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
    const gradient2 = this.ctx.createLinearGradient(this.firstx, this.firsty, this.lastx, this.lasty);

    gradient.addColorStop(0, this.color30);
    gradient.addColorStop(1, this.color10);

    gradient2.addColorStop(0, this.color30fill);
    gradient2.addColorStop(1, this.color10);

    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    const polygon = new Polygon(this.ctx, this.width / 2, this.height - (this.thickness / 2), this.thickness * 6, 5, this.color30fill, gradient2);
    polygon.draw();

    const writing = new Writing(this.ctx, this.width / 2, this.height - (this.thickness * 1.5), this.text, this.font, "center", "middle", "white", 5, "black");

    requestAnimationFrame(this.draw.bind(this));

  }
}