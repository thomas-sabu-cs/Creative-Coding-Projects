let creature = [];
let population = 50;

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    background(0);
    stroke(0,255,250);
    for (let i = 0; i < population; ++i) {
        let pos = createVector(random(10, width), random(10, height));
        let size = random(10, 100);
        let sw = random(0, 5);
        let col = color(random(100, 255), random(100), random(100, 255));
        creature[i] = new Creature(pos, size, sw, col, i);
    }
    rectMode(CENTER);
}

function draw() {
    background(0, 0, 0, 5);

    for (let i = 0; i < population; ++i) {
        push();
        creature[i].move();
        creature[i].spin();
        creature[i].display();
        pop();
    }
}

class Creature {
    constructor(pos, size, border, color, id) {
        this.pos = pos;
        this.vel = createVector(0, 0);
        this.size = size;
        this.border = border;
        this.color = color;
        this.angle = random(0, Math.PI * 2);
        this.speed = random(-0.35, 0.35);
        this.time = 0;
    }

    move() {


        if (mouseIsPressed) {
            let acc = createVector(mouseX, mouseY);

            // let acc = createVector(random(width), random(height));
            acc.sub(this.pos);
            // m.normalize();
            // m.mult(0.05);

            acc.setMag(0.05);
            this.vel.add(acc);
            this.vel.limit(5);
            this.pos.add(this.vel);
        }
        else {
            let acc = createVector(random(width), random(height));
            acc.sub(this.pos);
            // m.normalize();
            // m.mult(0.05);

            acc.setMag(0.05);
            this.vel.add(acc);
            this.vel.limit(5);
            this.pos.add(this.vel);
        }
    }

    spin() {
        rectMode(CENTER);
        translate(this.pos.x, this.pos.y);
        this.angle += this.speed;
        if (Math.abs(this.angle) > Math.PI * 2) {
            this.angle = 0;
        }
        rotate(this.angle);
    }

    display() {
        fill(this.color);
        strokeWeight(this.border);
        rect(0, 0, this.size, this.size);
    }
}
