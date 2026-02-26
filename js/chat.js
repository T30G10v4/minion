import { Writing } from "./writing.js";
import { YouTubeData } from "./youtubeData.js";

export class Chat {

    constructor(name, ctx, width = 1920, height = 1080, thickness = 100, color30, color10, span = 640) {

        this.name = name;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.thickness = thickness;

        this.color30 = "#" + color30;
        this.color10 = "#" + color10;

        this.span = span;

        this.cycle = true;
        this.shadowBlur = 0;
        this.endShadowBlur = 50;
        this.speed = 0.3;

        this.discord = new Image();
        this.discordLoaded = false;
        this.discord.onload = () => {
            this.discordLoaded = true;
        };
        this.discord.src = "../img/discord.svg";

        this.telegram = new Image();
        this.telegramLoaded = false;
        this.telegram.onload = () => {
            this.telegramLoaded = true;
        };
        this.telegram.src = "../img/telegram.svg";

        this.tiktok = new Image();
        this.tiktokLoaded = false;
        this.tiktok.onload = () => {
            this.tiktokLoaded = true;
        };
        this.tiktok.src = "../img/tiktok.svg";

        this.instagram = new Image();
        this.instagramLoaded = false;
        this.instagram.onload = () => {
            this.instagramLoaded = true;
        };
        this.instagram.src = "../img/instagram.svg";

        // Clock
        this.clock = "";
        this.updateClock();

        // Date
        this.date = "";
        this.updateDate();

        this._timerInterval = setInterval(() => {
            this.updateClock();
            this.updateDate();
        }, 1000);

        this.YouTubeData = new YouTubeData();

        this.YouTubeData.fetchSubscriberCount().then((count) => {
            this.subscriberCount = count;
        });

        this._youtubeSubscribersFetch = setInterval(async () => {
            this.subscriberCount = await this.YouTubeData.fetchSubscriberCount();
        }, 600000); // Update every 10 minutes 
    }

    draw() {

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        if (this.cycle) {
            this.shadowBlur += this.speed;
            //this.span += 1;
            if (this.shadowBlur >= this.endShadowBlur) {
                this.cycle = false;
            }

        } else {
            this.shadowBlur -= this.speed;
            //this.span -= 1;
            if (this.shadowBlur <= 0) {
                this.cycle = true;
            }
        }

        this.ctx.shadowColor = this.color10;
        this.ctx.shadowBlur = this.shadowBlur;

        // UNDER UPPER
        this.ctx.fillStyle = this.color10;
        this.ctx.fillRect(0, 0, 1920, 80);

        // UPPER
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        // 1 Vertex
        this.ctx.lineTo(this.width, 0);
        // 2 Vertex
        this.ctx.lineTo(this.width, this.thickness / 2);
        // 3 Vertex
        this.ctx.lineTo(this.width / 2 + this.span / 2 + this.thickness, this.thickness / 2);
        // 4 Vertex
        this.ctx.lineTo(this.width / 2 + this.span / 2, this.thickness);
        // 5 Vertex
        this.ctx.lineTo(this.width / 2 - this.span / 2, this.thickness);
        // 6 Vertex
        this.ctx.lineTo(this.width / 2 - this.span / 2 - this.thickness, this.thickness / 2);
        // 7 Vertex
        this.ctx.lineTo(0, this.thickness / 2);
        // 8 Vertex
        this.ctx.closePath();
        this.ctx.fillStyle = this.color30;
        this.ctx.fill();

        let font = `'Black Ops One', 'Stencil', 'Impact', sans-serif`;
        if (this.name == "Matt Wired") { font = `'Montserrat', sans-serif`; }

        const all1s0n = new Writing(this.ctx, this.width / 2, this.thickness / 2.5, this.name, `64px ` + font, "center", "middle", "white", 4, "black");

        // Light effect

        this.ctx.fillStyle = this.color10;
        this.ctx.fillRect(0, 1000, 1920, 80);

        // LOWER
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height);
        this.ctx.lineTo(this.width, this.height);
        this.ctx.lineTo(this.width, this.height - this.thickness);
        this.ctx.lineTo(this.width / 2 + this.span / 2 + this.thickness, this.height - this.thickness);
        this.ctx.lineTo(this.width / 2 + this.span / 2, this.height - this.thickness / 2);
        this.ctx.lineTo(this.width / 2 - this.span / 2, this.height - this.thickness / 2);
        this.ctx.lineTo(this.width / 2 - this.span / 2 - this.thickness, this.height - this.thickness);
        this.ctx.lineTo(0, this.height - this.thickness);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color30;
        this.ctx.fill();

        let imgThickness = this.thickness * 0.4;
        let imgY = this.thickness / 2;
        let imgDistance = 100;
        let imgDistanceFromCenter = 100;

        if (this.name == "Matt Wired") {
            imgThickness = this.thickness * 0.4;
            imgY = this.thickness / 2;
            imgDistance = 85;
            imgDistanceFromCenter = 150;
        }

        if (this.discordLoaded) {
            this.drawCenteredImage(this.discord, this.width / 2 - 2 * imgDistance - imgDistanceFromCenter, imgY, imgThickness);
        }

        if (this.telegramLoaded) {
            this.drawCenteredImage(this.telegram, this.width / 2 - imgDistance - imgDistanceFromCenter, imgY, imgThickness);
        }

        if (this.instagramLoaded) {
            this.drawCenteredImage(this.instagram, this.width / 2 + imgDistance + imgDistanceFromCenter, imgY, imgThickness);
        }

        if (this.tiktokLoaded) {
            this.drawCenteredImage(this.tiktok, this.width / 2 + 2 * imgDistance + imgDistanceFromCenter, imgY, imgThickness);
        }

        if (this.name == "4ll1s0n") {
            const subs = new Writing(this.ctx, this.width / 2, this.height - 10, `L'Army ha ` + this.subscriberCount + ` membri`, `32px ` + font, "center", "bottom", "white", 4, "black");
        }

        this.ctx.shadowColor = "transparent";
        this.ctx.shadowBlur = 0;

        //const whenLive = new Writing(this.ctx, 10, this.height-15, "LIVE ogni Lunedì alle 22:00", `32px 'Black Ops One', 'Stencil', 'Impact', sans-serif`, "left", "bottom", "white", 4, "black");
        //const motd = new Writing(this.ctx, this.width/2, this.height-15, "ISCRIVITI al Canale!", `32px 'Black Ops One', 'Stencil', 'Impact', sans-serif`, "center", "bottom", "white", 4, "black");
        const clock = new Writing(this.ctx, this.width - 10, this.height - 50, this.clock, `32px ` + font, "right", "bottom", "white", 4, "black");
        const date = new Writing(this.ctx, this.width - 10, this.height - 15, this.date, `32px ` + font, "right", "bottom", "white", 4, "black");
        //const spect = new Writing(this.ctx, 10, this.height - 50, "SPECT: 50", `32px 'Black Ops One', 'Stencil', 'Impact', sans-serif`, "left", "bottom", "white", 4, "black");


        requestAnimationFrame(this.draw.bind(this));

    }

    drawCenteredImage(img, x, y, size) {
        this.ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
    }

    updateClock() {

        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        this.clock = `${hours}:${minutes}`;

    }

    updateDate() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = now.getFullYear();
        this.date = `${day}/${month}/${year}`;
    }
}