function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let circles = [];
let numCircles = 10;

function setup() {
  createCanvas(800, 600);
  noStroke();

  for (let i = 0; i < numCircles; i++) {
    circles.push(new Circle());
  }
}

function draw() {
  background(255);

  for (let circle of circles) {
    circle.move();
    circle.display();
  }
}

class Circle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.radius = random(20, 50);
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
    this.color = color(random(150, 200), 0, random(150, 255), 100);
    this.history = [];
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x <= 0 || this.x >= width) {
      this.xSpeed *= -1;
    }
    if (this.y <= 0 || this.y >= height) {
      this.ySpeed *= -1;
    }

    this.history.push(createVector(this.x, this.y));
    if (this.history.length > 20) {
      this.history.shift();
    }
  }

  display() {
    fill(this.color);

    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      let diameter = map(i, 0, this.history.length, this.radius * 2, 0);
      ellipse(pos.x, pos.y, diameter);
    }

    this.x = mouseX;
    this.y = mouseY;
  }
}
