import { Prelive } from './prelive.js';

const myCanvas = document.getElementById("prelive");
const ctx = myCanvas.getContext("2d");

const prelive = new Prelive(ctx, "La live è in pausa..");
prelive.draw();
