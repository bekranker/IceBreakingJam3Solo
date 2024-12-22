const blocks = [];
let SpawnedPlayer = null;
let SpawnedBall = null;
let jump = false;

class block {
  constructor(x, y, name) {
    this.name = name;
    this.x = x;
    this.y = y;
  }
  drawMe = () => {
    const ctx = GetContext();
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.rect(this.x + 15, this.y - 30, 60, 20);
    ctx.stroke();
  };
  breakMe = () => {};
}

class Player {
  constructor(x, y, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    setInterval(this.changePos, 20);
  }

  drawMe = () => {
    const ctx = GetContext();
    ctx.beginPath();
    ctx.rect(this.x, this.y, 100, 20);
    ctx.strokeStyle = "white";
    ctx.stroke();
  };
  clearMe = () => {
    const ctx = GetContext();
    ctx.clearRect(this.x - 1, this.y - 1, 102, 22); // Önce eski pozisyonu temizle
  };
  changePos = () => {
    this.clearMe();
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.drawMe();
  };
}
class Ball {
  constructor(x, y, xSpeed, ySpeed) {
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.x = x;
    this.y = y;
    this.startPosY = 650;
    setInterval(this.changePos, 20);
  }
  drawMe = () => {
    const ctx = GetContext();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    ctx.strokeStyle = "white";
    ctx.stroke();
  };
  clearMe = () => {
    const ctx = GetContext();
    ctx.clearRect(this.x - 20, this.y - 20, 40, 40);
  };
  changePos = () => {
    if (!jump) {
      this.clearMe();
      this.changeStartPos();
      this.drawMe();
    } else {
      this.clearMe();
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      this.drawMe();
    }
  };
  changeStartPos = () => {
    this.x = SpawnedPlayer.x + 50;
    this.y = 650;
  };
}
function createBlocks() {
  for (let y = 1; y <= 3; y++) {
    for (let x = 0; x < 7; x++) {
      const createdBlock = new block(x * 85, y * 70, "name: " + x + " " + y);
      createdBlock.drawMe();
    }
  }
}
function spawnPlayer() {
  createBlocks();
  SpawnedPlayer = new Player(250, 700, 0, 0);
  SpawnedBall = new Ball(300, 650, 0, 0);
}
window.onload = spawnPlayer;
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    SpawnedPlayer.xSpeed = 10;
  } else if (e.key === "ArrowLeft") {
    SpawnedPlayer.xSpeed = -10;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") {
    SpawnedPlayer.xSpeed = 0;
  } else if (e.key === "ArrowLeft") {
    SpawnedPlayer.xSpeed = 0;
  }
});
window.addEventListener("keypress", (e) => {
  if (e.keyCode === 0 || e.keyCode === 32) {
    jump = true;
  }
});
