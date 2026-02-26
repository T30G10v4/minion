import { Writing } from './writing.js';

export class End {

  constructor(ctx, subtext="La Live sta per iniziare..", width = 1920, height = 1080, color10 ="#FF002F", color30 ="#2F002F", text="4ll1s0n") {
  
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.thickness = 75;

    this.color10 = color10;
    this.color30 = color30;

    this.time = 0;

    this.firstx = 0;
    this.firsty = 0;
    this.lastx = width;
    this.lasty = height;

    this.speed = 8;

    this.cycle1 = true;
    this.cycle2 = true;

    this.text = text;
    this.subtext = subtext;

    // DISCORD IMG
    this.discord = new Image();
    this.discordLoaded = false;
    this.discord.onload = () => {
        this.discordLoaded = true;
    };
    this.discord.src = "../img/discord.svg";

    // TELEGRAM IMG
    this.telegram = new Image();
    this.telegramLoaded = false;
    this.telegram.onload = () => {
        this.telegramLoaded = true;
    };
    this.telegram.src = "../img/telegram.svg";

    // TIKTOK IMG
    this.tiktok = new Image();
    this.tiktokLoaded = false;
    this.tiktok.onload = () => {
        this.tiktokLoaded = true;
    };
    this.tiktok.src = "../img/tiktok.svg";

    // INSTAGRAM IMG
    this.instagram = new Image();
    this.instagramLoaded = false;
    this.instagram.onload = () => {
        this.instagramLoaded = true;
    };
    this.instagram.src = "../img/instagram.svg";

  }

  draw() {

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.width, 0);
    this.ctx.lineTo(this.width, this.height);
    this.ctx.lineTo(0, this.height);
    this.ctx.closePath();

    if(this.cycle1 && this.cycle2){

      this.firstx += this.speed;
      this.lastx -= this.speed; 

      if(this.firstx >= this.width || this.lastx <= 0){
        this.cycle1 = false;
      }

    } else if(!this.cycle1 && this.cycle2){
    
      this.firsty += this.speed;
      this.lasty -= this.speed;

      if(this.firsty >= this.height || this.lasty <= 0){
        this.cycle2 = false;
      }
    } else if(!this.cycle1 && !this.cycle2){

      this.firstx -= this.speed;
      this.lastx += this.speed;

      if(this.firstx <= 0 || this.lastx >= this.width){
        this.cycle1 = true;
      }

    } else if(this.cycle1 && !this.cycle2){
      this.firsty -= this.speed;
      this.lasty += this.speed;
    
      if(this.firsty <= 0 || this.lasty >= this.height){
        this.cycle2 = true;
      }

    }

    const gradient = this.ctx.createLinearGradient(this.firstx, this.firsty, this.lastx, this.lasty);
    
    gradient.addColorStop(0, this.color30);
    gradient.addColorStop(1, this.color10);

    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    const moth = new Writing(this.ctx, this.width/2, this.height/3-5, this.subtext, `38px 'Black Ops One', 'Stencil', 'Impact', sans-serif`, "center", "middle", "white", 3.3, "black");
    const all1s0n = new Writing(this.ctx, this.width/2, this.height/2-40, `4ll1s0n`,`160px 'Black Ops One', 'Stencil', 'Impact', sans-serif`, "center", "middle");
    //const live = new Writing(this.ctx, this.width/2, (this.height)-30, `LIVE ogni Lunedì alle 22:00`, `46px 'Black Ops One', 'Stencil', 'Impact', sans-serif`, "center", "middle", "white", 3, "black");

    const imgY = 720;
    const imgDistance = 185;
    const imgDistanceFromCenter = -90;

    if(this.discordLoaded){
        this.drawCenteredImage(this.discord, this.width/2 - 2*imgDistance - imgDistanceFromCenter, imgY, this.thickness);
    }
   
    if(this.telegramLoaded){
        this.drawCenteredImage(this.telegram, this.width/2 - imgDistance - imgDistanceFromCenter, imgY, this.thickness);
    }

    if(this.instagramLoaded){
        this.drawCenteredImage(this.instagram, this.width/2 + imgDistance + imgDistanceFromCenter, imgY, this.thickness);
    }
    
    if(this.tiktokLoaded){
        this.drawCenteredImage(this.tiktok, this.width/2 + 2*imgDistance + imgDistanceFromCenter, imgY, this.thickness);
    }

    // Thirds

    /* this.ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    this.ctx.lineWidth = 2;


    this.ctx.moveTo(0, this.height/3);
    this.ctx.lineTo(this.width, this.height/3);

    this.ctx.moveTo(0, 2*this.height/3);
    this.ctx.lineTo(this.width, 2*this.height/3);

    this.ctx.moveTo(this.width/3, 0);
    this.ctx.lineTo(this.width/3, this.height);

    this.ctx.moveTo(2*this.width/3, 0);
    this.ctx.lineTo(2*this.width/3, this.height);
    this.ctx.stroke(); */

    requestAnimationFrame(this.draw.bind(this));

  }

  drawCenteredImage(img, x, y, size) {
        this.ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
    }
}