// Load JSON data dynamically
fetch('https://api.npoint.io/708f25230f6d3ca036e1')
    .then(response => response.json())
    .then(data => {
        // Load Game of the Year
        const goty = data.game_of_the_year;
        document.getElementById('goty-title').textContent = goty.title;
        document.getElementById('goty-image').src = goty.image;
        document.getElementById('goty-description').textContent = goty.description;

        // Load Categories
        const awardsContainer = document.getElementById('awards-container');
        data.categories.forEach(category => {
            const card = document.createElement('div');
            card.classList.add('category-card');
            card.innerHTML = `
                <img src="${category.image}" alt="${category.name}">
                <h3>${category.name}</h3>
                <p><strong>Winner:</strong> ${category.winner}</p>
                <p>${category.description}</p>
            `;
            awardsContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Error loading JSON data:', error));
