var alpha, beta, gamma;
var xpos, ypos;
var coni = [];
var anelli = [];
var myCanvas

function setup() {

  // set canvas size
  myCanvas = createCanvas(windowWidth, windowHeight);

  // default values
  xpos = -45;
  ypos = -45;
  alpha = 0;
  beta = 0;
  gamma = 0;

  for (var i = 0; i < 10; i++) {
    anelli[i] = new Anello(random(0, width), 6 * height / 7);
  }

  // for (var i = 0; i < 3; i++) {
  //   coni[i] = new Cono(width / 2 + (random(-width / 5, width / 5)), (i + 1) * height / 5);
  // }
}


function draw() {
  for (i = 0; i < touches.length; i++) {
    if (touches[i].x > (4*width / 5 - 70) && touches[i].x < (4*width / 5 + 70)) {
      for (var j = 0; j < anelli.length; j++) {
        if (anelli[j].pos.x > (width / 2)) anelli[j].pos.sub(0, random(0.1,3));
      }
    }
    if (touches[i].x > (width / 5 - 70) && touches[i].x < (width / 5 + 70)) {
      for (var j = 0; j < anelli.length; j++) {
        if (anelli[j].pos.x <= (width / 2)) anelli[j].pos.sub(0, random(0.1,3));
      }
    }
  }
  randomSeed(205);
  background(255);
  for (var i = 0; i < 3; i++) {
    coni[i] = new Cono(width / 2 + (random(-width / 5, width / 5)), (i + 1.5) * height / 5);
  }
  // set background color to white

  var pulSx = new Pulsante(width / 5, 6 * height / 7);
  var pulDx = new Pulsante(4 * width / 5, 6 * height / 7);


  if (beta < -2) {
    anelli.forEach(function(d) {
      d.up();
    });
  } else if (beta > 2) {
    anelli.forEach(function(d) {
      d.down();
    });
  }
  if (gamma < -2) {
    anelli.forEach(function(d) {
      d.left();
    });
  } else if (gamma > 2) {
    anelli.forEach(function(d) {
      d.right();
    });
  }
  // display variables
  fill(100);
  noStroke();
  text("alpha: " + alpha, 25, 25);
  text("beta: " + beta, 25, 50);
  fill(255, 0, 0);
  text("gamma: " + gamma, 25, 75);

  push();
  // translate(width / 2, height / 2);
  // rotate(radians(gamma));
  // fill(255, 0, 0);
  // rect(xpos, ypos, 80, 80);
  // fill(0);
  if (beta < -1) ypos--;
  else if (beta > 1) ypos++;
  if (ypos == height) ypos = 0;
  if (xpos == width) xpos = 0;
  pop();

  for (var i = 0; i < 10; i++) {
    anelli[i].show();
  }
}

// accelerometer Data
window.addEventListener('deviceorientation', function(e) {
  alpha = e.alpha;
  beta = e.beta;
  gamma = e.gamma;
});


function Cono(_x, _y) {
  var step;

  var lerpi = 0;
  for (step = _x - 6; step < _x + 6; step++) {

    stroke(
      lerpColor( // Variazione il colore da colore1 a colore2
        color('#c100ff'), // Colore1
        color('#a12960'), // Colore2
        lerpi / 12 // Interpolazione
      )
    );
    line(_x, _y - 75, step, _y);
    circle(_x, _y, 24 - lerpi);
    lerpi++;
  }
}

function Pulsante(_x, _y) {
  var step;
  var lerpi = 0;
  for (step = 1; step < 140 / 2; step++) {
    stroke(
      lerpColor( // Variazione il colore da colore1 a colore2
        color('#e4ff00'), // Colore1
        color('#ffb000'), // Colore2
        step / (140 / 2) // Interpolazione
      )
    );
    noFill();
    circle(_x, _y, step);
  }
}

function Anello(_x, _y) {
  this.pos = createVector(_x, _y);
  this.show = function() {
    noStroke();
    push();
    fill('green');
    circle(this.pos.x, this.pos.y, 30);
    pop();
    push();
    noStroke();
    fill(255);
    circle(this.pos.x, this.pos.y, 20);
    pop();
  }
  this.up = function() {
    if (this.pos.y > 10) this.pos.sub(0, random(0.1, 1));
  }
  this.down = function() {
    if (this.pos.y < (5 * height / 7)) this.pos.add(0, random(0.1, 1));
  }
  this.left = function() {
    if (this.pos.x > 10) this.pos.sub(random(0.1, 1), 0);
  }
  this.right = function() {
    if (this.pos.x < (width)) this.pos.add(random(0.1, 1), 0);
  }
}
