document.addEventListener('DOMContentLoaded', loadPlaylists);

function loadPlaylists() {
    fetch('https://api.npoint.io/28718000abe41036232b')
        .then(response => response.json())
        .then(playlists => {
            // Display all playlists
            const container = document.getElementById('playlist-container');
            playlists.forEach(playlist => {
                const card = createPlaylistCard(playlist);
                container.appendChild(card);
            });

            // Display featured playlist
            displayFeaturedPlaylist(playlists);
        })
        .catch(error => console.error('Error loading playlists:', error));
}

function createPlaylistCard(playlist) {
    const card = document.createElement('div');
    card.className = 'playlist-card';

    // Add a special class for official Nintendo playlists
    if (playlist.creator.toLowerCase() === 'nintendo') {
        card.classList.add('official-playlist');
    }

    card.onclick = () => window.open(playlist.link, '_blank');

    const icon = document.createElement('img');
    icon.src = playlist.icon;
    icon.alt = `${playlist.name} icon`;

    const title = document.createElement('div');
    title.className = 'playlist-title';
    title.textContent = playlist.name;

    const creator = document.createElement('div');
    creator.className = 'playlist-creator';
    creator.textContent = `Created by: ${playlist.creator}`;

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(creator);

    return card;
}

function filterPlaylists() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const playlists = document.querySelectorAll('.playlist-card');

    playlists.forEach(card => {
        const title = card.querySelector('.playlist-title').textContent.toLowerCase();
        if (title.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function displayFeaturedPlaylist(playlists) {
    // Find the first playlist marked as featured
    const featuredPlaylist = playlists.find(playlist => playlist.featured);

    if (featuredPlaylist) {
        const featuredCard = document.getElementById('featured-card');
        featuredCard.onclick = () => window.open(featuredPlaylist.link, '_blank');

        featuredCard.innerHTML = `
            <img src="${featuredPlaylist.icon}" alt="${featuredPlaylist.name} icon">
            <div class="playlist-title">${featuredPlaylist.name}</div>
            <div class="playlist-creator">Created by: ${featuredPlaylist.creator}</div>
            <div class="playlist-tags">${featuredPlaylist.tags.join(', ')}</div>
        `;
    } else {
        console.warn("No featured playlist found in the JSON data.");
    }
}
