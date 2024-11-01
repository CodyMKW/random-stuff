// script.js
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
      <img src="${playlist.icon}" alt="${escapeSpecialChars(playlist.name)}" class="playlist-icon">
      <div class="playlist-info">
          <h3>${playlist.name}</h3>
          <a href="${playlist.link}" target="_blank">Listen Now</a>
          <button class="embed-btn" onclick="generateEmbedCode('${escapeSpecialChars(playlist.name)}', '${escapeSpecialChars(playlist.icon)}', '${escapeSpecialChars(playlist.link)}')">Embed</button>
      </div>
    `;    
      container.appendChild(card);
  });
}

let currentEmbedCode = ''; // Variable to hold the current embed code

function generateEmbedCode(name, icon, link) {
  const embedCodeContainer = document.getElementById('embed-code-container');
  currentEmbedCode = `<a href="${link}" target="_blank"><img src="${icon}" alt="${name}" style="width:300px; height:150px; border:none; object-fit:cover;"></a>`;
  
  embedCodeContainer.innerHTML = `<p>Embed Code:</p><code class="embed-code">${currentEmbedCode}</code>`;
  embedCodeContainer.style.display = 'block';
}

function copyEmbedCode() {
  if (currentEmbedCode) {
      navigator.clipboard.writeText(currentEmbedCode)
          .then(() => {
              alert('Embed code copied to clipboard!');
          })
          .catch(err => {
              console.error('Failed to copy: ', err);
          });
  } else {
      alert('No embed code to copy!');
  }
}

function escapeSpecialChars(string) {
  return string.replace(/'/g, "\\'").replace(/"/g, '\\"');
}
