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
        <h3>${playlist.name}</h3>
        <a href="${playlist.link}" target="_blank">Listen Now</a>
      </div>
    `;
    container.appendChild(card);
  });
}