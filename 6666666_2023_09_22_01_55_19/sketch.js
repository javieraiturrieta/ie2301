function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let flakes = [];
let trail = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  // Dibuja la estela de copos de nieve anteriores
  for (let i = 0; i < trail.length; i++) {
    let t = trail[i];
    t.update();
    t.display();
    if (t.opacity <= 0) {
      trail.splice(i, 1);
    }
  }

  // Dibuja los copos de nieve actuales
  for (let i = flakes.length - 1; i >= 0; i--) {
    flakes[i].update();
    flakes[i].display();

    // Agrega una estela detrás de cada copo de nieve
    let trailFlake = flakes[i].createTrailFlake();
    trail.push(trailFlake);

    if (flakes[i].size <= 0) {
      flakes.splice(i, 1);
    }
  }
}

function mouseClicked() {
  let x = mouseX;
  let y = mouseY;
  let numFlakes = int(random(5, 20)); // Número de copos en cada clic

  for (let i = 0; i < numFlakes; i++) {
    let size = random(10, 30);
    let flakeColor = color(random(255), random(255), random(255));
    let angle = random(TWO_PI); // Dirección de inicio aleatoria
    flakes.push(new Snowflake(x, y, size, flakeColor, angle));
  }
}

class Snowflake {
  constructor(x, y, size, flakeColor, angle) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.flakeColor = flakeColor;
    this.speed = random(0.5, 1.5); // Velocidad más lenta
    this.angle = angle; // Dirección de movimiento
  }

  update() {
    // Calcula las nuevas coordenadas en función del ángulo y la velocidad
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    // Cambia la dirección al llegar a los bordes del lienzo
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.angle += PI; // Cambia la dirección en 180 grados
    }

    this.size -= 0.1;
  }

  display() {
    noStroke();
    fill(this.flakeColor);
    drawSnowflake(this.x, this.y, this.size);
  }

  createTrailFlake() {
    return new TrailFlake(this.x, this.y, this.size, this.flakeColor);
  }
}

class TrailFlake {
  constructor(x, y, size, flakeColor) {
    this.x = x;
    this.y = y;
    this.size = size * 0.5; // Tamaño reducido
    this.flakeColor = color(red(flakeColor), green(flakeColor), blue(flakeColor), 50); // Opacidad más reducida
    this.opacity = 50;
  }

  update() {
    this.opacity -= 1; // Disminuir la opacidad gradualmente
  }

  display() {
    noStroke();
    fill(this.flakeColor);
    drawSnowflake(this.x, this.y, this.size);
  }
}

function drawSnowflake(x, y, s) {
  let angle = TWO_PI / 6;
  let halfSize = s / 2;

  beginShape();
  for (let i = 0; i < 6; i++) {
    let xOffset = cos(angle * i) * halfSize;
    let yOffset = sin(angle * i) * halfSize;
    vertex(x + xOffset, y + yOffset);

    let nextX = cos(angle * (i + 1)) * halfSize;
    let nextY = sin(angle * (i + 1)) * halfSize;
    line(x + xOffset, y + yOffset, x + nextX, y + nextY);
  }
  endShape(CLOSE);
}
