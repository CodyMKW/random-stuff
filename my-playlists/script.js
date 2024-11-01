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

// Function to escape quotes
function escapeQuotes(string) {
  return string.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

function generateEmbedCode(name, icon, link) {
  const embedCodeContainer = document.getElementById('embed-code-container');

  const embedCode = `
<a href="${link}" target="_blank">
  <img src="${icon}" alt="${name}" style="width:300px; height:150px; border:none; object-fit:cover;">
</a>
`;
  
  embedCodeContainer.innerHTML = `<p>Embed Code:</p><code class="embed-code">${embedCode}</code>`;
  embedCodeContainer.style.display = 'block';
}
