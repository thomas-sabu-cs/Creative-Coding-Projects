let x = [];
let y = [];
let d = [];
let xdir = [];
let ydir = [];
let changedColor = [];
let trackImg = []; 
let num = 200;
let gravity = 0.1;
let isPaused = false;
let OGdoge; 
let ripDoge; 

function preload() {
  OGdoge = loadImage("doge.jpg");  
  ripDoge = loadImage("doge2.jpg"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  startParticles();
}

function draw() {
  frameRate(60);
  fill(0, 32);
  noStroke();
  rect(0, 0, width, height);

  let changedCount = 0;
  for (let i = 0; i < num; ++i) {
    let r = d[i] * 0.5;

    let mouseDistance = dist(mouseX, mouseY, x[i], y[i]);
    let repelRadius = 100;
    if (mouseDistance < repelRadius) {
      let repelForce = map(mouseDistance, 0, repelRadius, 0.5, 0);
      let angle = atan2(y[i] - mouseY, x[i] - mouseX);
      xdir[i] += cos(angle) * repelForce;
      ydir[i] += sin(angle) * repelForce;
    }

    ydir[i] += gravity;
    xdir[i] *= 0.99;

    if (setColor(i, r)) {
      changedColor[i] = true;
    }
    if (changedColor[i]) {
      changedCount++;
    }

    image(trackImg[i], x[i], y[i], d[i], d[i]);

    x[i] += xdir[i];
    y[i] += ydir[i];

    if (x[i] > width - r || x[i] < r) {
      xdir[i] *= -1;
    }
    if (y[i] > height - r) {
      ydir[i] *= -0.9;
      y[i] = height - r;
    } else if (y[i] < r) {
      ydir[i] *= -1;
      y[i] = r;
    }
  }

  let remainingCount = num - changedCount;
  fill(255);
  noStroke();
  textSize(20);
  text(`Changed: ${changedCount}`, 20, 30);
  text(`Remaining: ${remainingCount}`, 20, 60);
  text(`Press R to restart!`, 20, 80);
  text(`Press P to pause!`, 20, 100);
}

function setColor(i, r) {
  let away = dist(mouseX, mouseY, x[i], y[i]);
  if (away < r) {
    trackImg[i] = ripDoge;
    return true;
  }
  return false;
}

function mousePressed() {
  loop();
}

function keyPressed() {
  if (key === 'R' || key === 'r') {
    startParticles();
    loop();
    isPaused = false;
  } else if (key === 'P' || key === 'p') {
    if (isPaused) {
      loop();
      isPaused = false;
    } else {
      noLoop();
      isPaused = true;
    }
  }
}

function startParticles() {
  for (let i = 0; i < num; i++) {
    d[i] = random(20, 70);
    x[i] = width / 2;
    y[i] = height / 2;
    xdir[i] = random(-(75 - d[i]) * 0.25, (75 - d[i]) * 0.25);
    ydir[i] = random(-(75 - d[i]) * 0.25, (75 - d[i]) * 0.25);
    changedColor[i] = false;
    trackImg[i] = OGdoge; 
  }
}