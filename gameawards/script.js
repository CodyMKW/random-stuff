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
                <button class="share-btn" data-game="${category.winner}" data-category="${category.name}">Share</button>
                <p class="share-success-message">Text copied to clipboard!</p>
            `;
            awardsContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Error loading JSON data:', error));

    document.addEventListener('DOMContentLoaded', () => {
        // Add event listener for category share buttons
        const categoryShareButtons = document.querySelectorAll('.share-btn');
        
        categoryShareButtons.forEach(button => {
            button.addEventListener('click', () => {
                const game = button.getAttribute('data-game');
                const category = button.getAttribute('data-category');
                const shareText = `${game} won the ${category} category! Check it out at https://codymkw.github.io/random-stuff/gameawards`;
                
                // Copy text to clipboard
                navigator.clipboard.writeText(shareText).then(() => {
                    // Show success message
                    const successMessage = button.nextElementSibling; // The p tag with class share-success-message
                    successMessage.style.display = 'block';
                    
                    // Hide success message after 3 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 3000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            });
        });
    
        // Add event listener for Game of the Year share button
        const gotyShareButton = document.querySelector('.goty-section .share-btn');
        
        if (gotyShareButton) {
            gotyShareButton.addEventListener('click', () => {
                const game = document.getElementById('goty-title').textContent; // Game of the Year title
                const shareText = `${game} won Game of the Year! Check it out at https://codymkw.github.io/random-stuff/gameawards`;
    
                // Copy text to clipboard
                navigator.clipboard.writeText(shareText).then(() => {
                    // Show success message
                    const successMessage = gotyShareButton.nextElementSibling;
                    successMessage.style.display = 'block';
    
                    // Hide success message after 3 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 3000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            });
        }
    });
    