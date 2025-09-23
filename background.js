// =========================
// PARAMETERS (easy to change)
// =========================
let w = window.innerWidth;
let h = window.innerHeight;
let background = "rgb(5, 5, 5)";

let blobColor = "gray";
let blobSize = 1;
let blobVel = 0.1;
let count = 100;
let decimals = 5;      // number of decimal places for velocity
let maximal = false;   // if true, all blobs have same speed
let sameSpeedDiffDir = false; // if true, same speed but different directions

// =========================
// HELPER FUNCTION
// =========================
function randomVel(maxVel) {
  let factor = Math.pow(10, decimals);
  return (Math.floor((Math.random() * 2 * maxVel * factor) - maxVel * factor)) / factor;
}

// =========================
// BLOB CLASS
// =========================
class Blob {
  constructor(size, maxVel, color) {
    this.size = size;
    this.color = color;
    this.pos = { x: Math.random() * w, y: Math.random() * h };

    if (maximal) {
      this.vel = { x: maxVel, y: 0 }; // all same speed in x direction
    } else if (sameSpeedDiffDir) {
      // random angle but same speed magnitude
      let angle = Math.random() * 2 * Math.PI;
      this.vel = { x: maxVel * Math.cos(angle), y: maxVel * Math.sin(angle) };
    } else {
      // normal random velocity
      this.vel = { x: randomVel(maxVel), y: randomVel(maxVel) };
    }
  }

  move() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.border();
  }

  border() {
    if (this.pos.x > w) this.pos.x -= w;
    if (this.pos.x < 0) this.pos.x += w;
    if (this.pos.y > h) this.pos.y -= h;
    if (this.pos.y < 0) this.pos.y += h;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  cycle(ctx) {
    this.move();
    this.draw(ctx);
  }
}

// =========================
// SETUP CANVAS AND BLOBS
// =========================
const canvas = document.getElementById("blobCanvas");
const ctx = canvas.getContext("2d");
canvas.width = w;
canvas.height = h;

const blobs = [];
for (let i = 0; i < count; i++) {
  blobs.push(new Blob(blobSize, blobVel, blobColor));
}

// =========================
// ANIMATION LOOP
// =========================
function animate() {
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, w, h);

  blobs.forEach(blob => blob.cycle(ctx));

  requestAnimationFrame(animate);
}

// =========================
// HANDLE RESIZE
// =========================
window.addEventListener('resize', () => {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
});

animate();