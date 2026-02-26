export class Third {

    constructor(ctx) {
        this.ctx = ctx;
    }

    draw() {
        this.ctx.moveTo(0, this.ctx.canvas.height / 3);
        this.ctx.lineTo(this.ctx.canvas.width, this.ctx.canvas.height / 3);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    erase() {

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    }
}