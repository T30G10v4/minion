import { End } from './end.js';

const myCanvas = document.getElementById("prelive");
const ctx = myCanvas.getContext("2d");

const end = new End(ctx, "(non) Il solito canale di Gaming");
end.draw();
