// =========================
// PARAMETERS (easy to change)
// =========================
let w = window.innerWidth;
let h = window.innerHeight;
let background = "rgb(5, 5, 5)";

let blobColor = "rgba(102, 102, 102, 1)";
let blobSize = 2;
let blobVel = 0.2;     // max speed
let count = 200;
let decimals = 2;      // number of decimal places for velocity
let direction = 0.1 * Math.PI;  // angle in radians (null = random per blob)
let sameSpeed = false; // if true, all blobs move with exactly the same speed

// =========================
// HELPER FUNCTIONS
// =========================
function randomVel(maxVel) {
  let minVel = 0.1 * maxVel; // minst 10% av max
  let factor = Math.pow(10, decimals);
  let vel;
  do {
    vel = (Math.floor((Math.random() * 2 * maxVel * factor) - maxVel * factor)) / factor;
  } while (Math.abs(vel) < minVel); // se till att hastigheten inte är för låg
  return vel;
}

function randomSpeed(maxVel) {
  let minSpeed = 0.1 * maxVel; // minst 10% av max
  let factor = Math.pow(10, decimals);
  let speed;
  do {
    speed = Math.floor(Math.random() * maxVel * factor) / factor;
  } while (speed < minSpeed); // se till att hastigheten inte är för låg
  return speed;
}

// =========================
// BLOB CLASS
// =========================
class Blob {
  constructor(size, maxVel, color, direction, sameSpeed) {
    this.size = size;
    this.color = color;
    this.pos = { x: Math.random() * w, y: Math.random() * h };

    if (direction !== null) {
      // Alla går åt samma håll
      let speed = sameSpeed ? maxVel : randomSpeed(maxVel);
      this.vel = { x: speed * Math.cos(direction), y: speed * Math.sin(direction) };
    } else {
      // Slumpad riktning
      let vx, vy;
      do {
        vx = randomVel(maxVel);
        vy = randomVel(maxVel);
      } while (vx === 0 && vy === 0); // se till att inte båda är noll
      this.vel = { x: vx, y: vy };
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
  blobs.push(new Blob(blobSize, blobVel, blobColor, direction, sameSpeed));
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
