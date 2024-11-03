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

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Apply saved theme on load
    document.body.classList.add(`${currentTheme}-theme`);

    // Update button text based on theme
    updateToggleButtonText(currentTheme);

    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');

        // Save the theme preference
        const newTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);

        // Update button text based on the new theme
        updateToggleButtonText(newTheme);
    });
});

// Function to update the toggle button text
function updateToggleButtonText(theme) {
    const themeToggleButton = document.getElementById('theme-toggle');
    themeToggleButton.textContent = theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
}
