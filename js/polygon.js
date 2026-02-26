export class Polygon {

    constructor(ctx, x, y, height, sides, color, gradient) {

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.height = height;
        this.sides = sides;
        this.color = color;
        this.gradient = gradient;

    }

    draw() {

        this.ctx.beginPath();
        for (let i = 0; i < this.sides; i++) {
            const angle = (2 * Math.PI * i / this.sides) + Math.PI / 2;
            const px = this.x + this.height * Math.cos(angle);
            const py = this.y + this.height * Math.sin(angle);
            if (i === 0) {
                this.ctx.moveTo(px, py);
            } else {
                this.ctx.lineTo(px, py);
            }
        }
        this.ctx.closePath();
        this.ctx.fillStyle = this.gradient;
        this.ctx.fill();
    }

}