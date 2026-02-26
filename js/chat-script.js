import { Chat } from './chat.js';

const params = new URLSearchParams(window.location.search);
const name = params.get("name");
const color30 = params.get("color30");
const color10 = params.get("color10");

const myCanvas = document.getElementById("chat");
const ctx = myCanvas.getContext("2d");

const chat = new Chat(name, ctx, 1920, 1080, 100, color30, color10);
chat.draw();