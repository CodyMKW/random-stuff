document.addEventListener('DOMContentLoaded', loadPlaylists);

function loadPlaylists() {
    fetch('https://api.npoint.io/28718000abe41036232b')
        .then(response => response.json())
        .then(playlists => {
            const mainContainer = document.getElementById('playlist-container');
            const featuredContainer = document.getElementById('featured-playlist-container');

            playlists.forEach(playlist => {
                if (playlist.featured) {
                    // Add to featured section only
                    featuredContainer.appendChild(createPlaylistCard(playlist));
                } else {
                    // Add to main section only if not featured
                    mainContainer.appendChild(createPlaylistCard(playlist));
                }
            });
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

    // Set data-tags attribute to include all tags for search functionality
    if (playlist.tags) {
        card.setAttribute('data-tags', playlist.tags.join(' ')); // Join tags as a single string
    } else {
        card.setAttribute('data-tags', ''); // Empty if no tags
    }

    return card;
}

function filterPlaylists() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const playlists = document.querySelectorAll('.playlist-card');

    playlists.forEach(card => {
        const title = card.querySelector('.playlist-title').textContent.toLowerCase();
        const tags = card.getAttribute('data-tags') ? card.getAttribute('data-tags').toLowerCase() : "";

        // Check if the query matches either the title or tags
        if (title.includes(query) || tags.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function sortPlaylists() {
    const sortOption = document.getElementById('sort-options').value;
    const container = document.getElementById('playlist-container');
    const playlists = Array.from(container.getElementsByClassName('playlist-card'));

    // Sorting logic based on selected option
    playlists.sort((a, b) => {
        const nameA = a.querySelector('.playlist-title').textContent.toLowerCase();
        const nameB = b.querySelector('.playlist-title').textContent.toLowerCase();

        if (sortOption === 'alphabetical') {
            return nameA.localeCompare(nameB);
        } else if (sortOption === 'reverse-alphabetical') {
            return nameB.localeCompare(nameA);
        }
        return 0;
    });

    // Clear the container and append sorted playlists
    container.innerHTML = '';
    playlists.forEach(playlist => container.appendChild(playlist));
}
