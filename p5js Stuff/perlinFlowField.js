let particles = [];
const num = 10500;
const noiseScale = 0.01;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noiseDetail(0,0,0.4);
  noiseSeed(0);
  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }
  
  stroke(0,128,128);
  noiseSeed(99);
}

function draw() {
  background(0, 7);
  
  for (let i = 0; i < num; i++) {
    let p = particles[i];
    point(p.x, p.y);
    let n = noise(p.x * noiseScale, p.y * noiseScale);
    let a = TAU * n;
    if (mouseIsPressed){
        let mV = createVector(mouseX,mouseY);
        a = mV.angleBetween(p);
    }

    p.x += cos(a);
    p.y += sin(a);
    
    if (!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }
}

function onScreen(v) {
  if (v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height){
    return true;
  }
  else{
    return false;
  }
}