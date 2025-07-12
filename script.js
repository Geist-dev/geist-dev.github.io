
// Тема
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
});

// GitHub проекты
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
  } catch (e) {
    container.innerHTML = 'Не удалось загрузить проекты.';
  }
}
loadRepos();
