import { Overlay } from './overlay.js';

//let color10 = '#FF002F';
let color10 = '#FF002F';
let color30 = "rgba(47,0,47,0.7)";
let color30fill = "#2F002F";
let text = "410";
let font = "50px 'Black Ops One', 'Stencil', 'Impact', sans-serif";

const myCanvas = document.getElementById("overlay");
const ctx = myCanvas.getContext("2d");

const overlay = new Overlay(ctx, 480, 270, color10, color30, 10, color30fill, text, font);
overlay.draw();