const bgCanvas = document.getElementById("bg-canvas");
const bgCtx = bgCanvas.getContext("2d");

function resize() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
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
  bgCtx.save();
  bgCtx.translate(x, y);
  bgCtx.scale(scale, scale);
  bgCtx.fillStyle = "#704214";
  bgCtx.fillRect(-5, 0, 10, 40); // trunk

  for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * 25;
    const bx = Math.cos(angle) * r;
    const by = -40 + Math.sin(angle) * r;
    bgCtx.beginPath();
    bgCtx.fillStyle = theme === "day" ? "pink" : "#cc88aa";
    bgCtx.arc(bx, by, 3, 0, Math.PI * 2);
    bgCtx.fill();
  }
  bgCtx.restore();
}

function drawSky() {
  const g = bgCtx.createLinearGradient(0, 0, 0, bgCanvas.height);
  if (theme === "night") {
    g.addColorStop(0, "#0a0a2a");
    g.addColorStop(1, "#1a1a3a");
  } else {
    g.addColorStop(0, "#87cefa");
    g.addColorStop(1, "#ffffff");
  }
  bgCtx.fillStyle = g;
  bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

  if (theme === "night") {
    bgCtx.drawImage(moon, bgCanvas.width - 100, 50, 50, 50);
    for (let i = 0; i < 50; i++) {
      bgCtx.beginPath();
      bgCtx.fillStyle = "white";
      bgCtx.arc(Math.random() * bgCanvas.width, Math.random() * bgCanvas.height / 2, 1, 0, Math.PI * 2);
      bgCtx.fill();
    }
  } else {
    bgCtx.drawImage(sun, bgCanvas.width - 100, 50, 40, 40);
  }
}

function draw() {
  drawSky();
  for (let i = 0; i < bgCanvas.width; i += 150) {
    drawTree(i + 75, bgCanvas.height - 100, 1 + Math.random() * 0.5);
  }
  requestAnimationFrame(draw);
}
draw();
