document.addEventListener("DOMContentLoaded", () => {
  fetch('https://api.npoint.io/69443341fb55442c1f1a')
      .then(response => response.json())
      .then(data => displayPlaylists(data.playlists))
      .catch(error => console.error('Error loading playlists:', error));
});

function displayPlaylists(playlists) {
  const container = document.getElementById('playlist-container');
  playlists.forEach(playlist => {
      const card = document.createElement('div');
      card.classList.add('playlist-card');

      card.innerHTML = `
          <img src="${playlist.icon}" alt="${playlist.name}" class="playlist-icon">
          <div class="playlist-info">
              <h3>${escapeQuotes(playlist.name)}</h3>
              <a href="${playlist.link}" target="_blank">Listen Now</a>
              <button class="embed-btn" onclick="generateEmbedCode('${escapeQuotes(playlist.name)}', '${playlist.icon}', '${playlist.link}')">Embed</button>
          </div>
      `;
      container.appendChild(card);
  });
}

let currentEmbedCode = '';

function generateEmbedCode(name, icon, link) {
  currentEmbedCode = `<a href="${link}" target="_blank">
      <img src="${icon}" alt="${name}" style="width:250px; border-radius:5px; object-fit:cover;">
      <div>${name}</div>
  </a>`;

  document.getElementById('embed-code-display').textContent = currentEmbedCode;
  document.getElementById('embed-code-container').style.display = 'block';
}

function copyEmbedCode() {
  if (currentEmbedCode) {
      navigator.clipboard.writeText(currentEmbedCode)
          .then(() => alert('Embed code copied to clipboard!'))
          .catch(err => console.error('Failed to copy:', err));
  } else {
      alert('No embed code to copy!');
  }
}

function escapeQuotes(string) {
  return string.replace(/'/g, "\\'").replace(/"/g, '\\"');
}
