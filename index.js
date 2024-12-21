const blocks = [];
let SpawnedPlayer = null;
class block {
  constructor(x, y, name) {
    this.name = name;
    this.x = x;
    this.y = y;
  }
  drawMe = () => {
    const ctx = GetContext();
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
  }

  drawMe = () => {
    const ctx = GetContext();
    ctx.strokeStyle = "white";
    ctx.rect(this.x, this.y, 120, 20);
    ctx.stroke();
  };
  clearMe = () => {
    const ctx = GetContext();
    ctx.clearRect(this.x, this.y, 120, 20);
  };
  changePos = () => {
    this.clearMe();
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.drawMe();
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
  SpawnedPlayer = new Player(250, 700, 100, 100);
  console.log(SpawnedPlayer);
  SpawnedPlayer.drawMe();
}
window.onload += spawnPlayer();
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

window.onkeyup += () => {
  SpawnedPlayer.xSpeed = 0;
};
