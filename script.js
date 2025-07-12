
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
});

document.getElementById('music-btn').addEventListener('click', () => {
  const audio = document.getElementById('bg-music');
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

async function loadRepos() {
  const container = document.getElementById('project-list');
  try {
    const res = await fetch('https://api.github.com/users/Geist-dev/repos');
    const repos = await res.json();
    container.innerHTML = '';
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    repos.forEach(repo => {
      const el = document.createElement('div');
      el.innerHTML = `<strong><a href="${repo.html_url}" target="_blank">${repo.name}</a></strong>: ${repo.description || 'Без описания'}`;
      el.style.marginBottom = '1rem';
      container.appendChild(el);
    });
  } catch {
    container.innerHTML = 'Не удалось загрузить проекты.';
  }
}
loadRepos();

const canvas = document.getElementById("petals-canvas");
const ctx = canvas.getContext("2d");
let petals = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Petal {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.size = Math.random() * 5 + 5;
    this.speedY = Math.random() * 1 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.opacity = Math.random() * 0.5 + 0.3;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,182,193,${this.opacity})`;
    ctx.ellipse(this.x, this.y, this.size, this.size / 2, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fill();
  }
}

for (let i = 0; i < 100; i++) petals.push(new Petal());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();
