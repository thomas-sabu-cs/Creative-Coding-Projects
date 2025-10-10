let t = 0;          
let inc = 0.01;     

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  strokeWeight(2);
  noFill();
  noiseSeed(12345);
  noiseDetail(4, 0.5);
}

function draw() {
  background(20);

  const oct = floor(map(constrain(mouseX, 0, width), 0, width, 1, 8));
  const fall = map(constrain(mouseY, 0, height), 0, height, 0.0, 0.9);
  noiseDetail(oct, fall);
  if (mouseIsPressed) {
    noiseSeed(int(mouseX * 1000 + mouseY));
  }

  beginShape();
  for (let x = 0; x < width; x++) {
    const n = noise(x * inc + t);  
    const amp = height * 0.35;     
    const y = height * 0.5 + map(n, 0, 1, -amp, amp);
    vertex(x, y);
  }
  endShape();
  t += 0.01;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}