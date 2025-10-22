let particles = [];
const num = 10500;
const noiseScale = 0.01;
let hueOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noiseDetail(0,0,0.4);
  noiseSeed(0);
  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }
  
  noiseSeed(99);
}

function draw() {
  background(0, 7);
  
  // Slowly cycle through rainbow colors
  hueOffset = (hueOffset + 0.5) % 360;
  stroke(hueOffset, 80, 100);
  
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