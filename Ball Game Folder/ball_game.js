const canvas = document.getElementById("xyz");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");


let x = [];
let y = [];
let r = [];
let xdir = [];
let ydir = [];
let red = [];
let green = [];
let blue = [];


xdir[0] = Math.random() * 20 - 5;
ydir[0] = Math.random() * 20 - 5;

let num = 2;

for (let i = 0; i < num; ++i) {
    x[i] = innerWidth / 2;
    y[i] = innerHeight / 2;
    xdir[i] = Math.random() * 20 - 10;
    ydir[i] = Math.random() * 20 - 10;
    red[i] = Math.floor((Math.random() * 255 * 2)) % 255;
    green[i] = Math.floor((Math.random() * 255 * 2)) % 255;
    blue[i] = Math.floor((Math.random() * 255 * 2)) % 255;
    r[i] = Math.random() * 25
}


let red1 = Math.random() * 255;
let green1 = Math.random() * 255;
let blue1 = Math.random() * 255;

let canvas_x = innerWidth;
let canvas_y = innerHeight;


function draw() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {

        for (i = 0; i < 0; ++i) {
            ctx.fillStyle = "rgba(" + red1[i] + "," + green[i] + "," + blue[i] + ", 0.1)";
            ctx.fillRect(0, 0, canvas_x, canvas_y);


            ctx.beginPath();
            ctx.fillStyle = "rgb(" + red[i] + "," + green[i] + "," + blue[i] + ")";


            ctx.arc(x[i], y[i], r[i], 0, Math.PI * 2, true);

            ctx.fill();
            x[i] += xdir[i];
            y[i] += ydir[i];


            if (x[i] > canvas_x - r[i] || x[i] < r[i]) {
                xdir[i] *= -1
            }


            if (y[i] > canvas_y - r[i] || y[i] < r[i]) {
                ydir[i] *= -1
            }
        }
    }
}
setInterval(draw, 5)
