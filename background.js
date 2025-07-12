const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let theme = "night";
const moon = new Image();
const sun = new Image();
moon.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Full_Moon_Luc_Viatour.jpg/200px-Full_Moon_Luc_Viatour.jpg";
sun.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Sun_symbol.svg/120px-Sun_symbol.svg.png";

document.getElementById("theme-toggle").addEventListener("click", () => {
  theme = document.body.classList.contains("light") ? "day" : "night";
});

function drawTree(x, y, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#704214";
  ctx.fillRect(-5, 0, 10, 40); // trunk

  // blossoms
  for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * 25;
    const bx = Math.cos(angle) * r;
    const by = -40 + Math.sin(angle) * r;
    ctx.beginPath();
    ctx.fillStyle = theme === "day" ? "pink" : "#cc88aa";
    ctx.arc(bx, by, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawSky() {
  const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
  if (theme === "night") {
    g.addColorStop(0, "#0a0a2a");
    g.addColorStop(1, "#1a1a3a");
  } else {
    g.addColorStop(0, "#87cefa");
    g.addColorStop(1, "#ffffff");
  }
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // celestial object
  if (theme === "night") {
    ctx.drawImage(moon, canvas.width - 100, 50, 50, 50);
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height / 2, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    ctx.drawImage(sun, canvas.width - 100, 50, 40, 40);
  }
}

function draw() {
  drawSky();
  for (let i = 0; i < canvas.width; i += 150) {
    drawTree(i + 75, canvas.height - 100, 1 + Math.random() * 0.5);
  }
  requestAnimationFrame(draw);
}
draw();
