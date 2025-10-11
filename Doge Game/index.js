let x = [];
let y = [];
let d = [];
let xdir = [];
let ydir = [];
let red = [];
let green = [];
let blue = [];
let num = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < num; i++) {
    green[i] = Math.floor(Math.random() * 25);
    blue[i] = Math.floor(Math.random() * 256);
    red[i] = Math.floor(Math.random() * 25);
    d[i] = random(10, 75);
    x[i] = width / 2;
    y[i] = height / 2;
    xdir[i] = random(-(75 - d[i]) * 0.25, (75 - d[i]) * 0.25);
    ydir[i] = random(-(75 - d[i]) * 0.25, (75 - d[i]) * 0.25);
  }
  noLoop();
}
function draw() {
  frameRate(60);
  fill(0, 32);
  noStroke();
  rect(0, 0, width, height);
  for (let i = 0; i < num; ++i) {
    fill(red[i], green[i], blue[i], 200);
    let r = d[i] * 0.5;

    let mouseDistance = dist(mouseX, mouseY, x[i], y[i]);
    let repelRadius = 100; 
    
    if (mouseDistance < repelRadius) {
      let repelForce = map(mouseDistance, 0, repelRadius, 0.5, 0);
      let angle = atan2(y[i] - mouseY, x[i] - mouseX);
      xdir[i] += cos(angle) * repelForce;
      ydir[i] += sin(angle) * repelForce;
    }
    
    setColor(x[i], y[i], r, i);
    strokeWeight(d[i] * 0.125);
    let c = color(map(d[i], 10, 75, 0, 128), 0, 0, 255);
    stroke(c);
    circle(x[i], y[i], d[i]);
    x[i] += xdir[i];
    y[i] += ydir[i];
    if (x[i] > width - r || x[i] < r) {
      xdir[i] *= -1;
    }
    if (y[i] > height - r || y[i] < r) {
      ydir[i] *= -1;
    }
  }
}
function setColor(x, y, r, i) {
  let away = dist(mouseX, mouseY, x, y);
  if(away < r) {
    fill(255, 0, 0);
  }
}

function mousePressed() {
    loop();
}