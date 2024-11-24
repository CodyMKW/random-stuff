document.getElementById('fetchVerse').addEventListener('click', async () => {
    const verseElement = document.getElementById('verse');
    verseElement.textContent = 'Fetching...';

    try {
        const response = await fetch('https://bible-api.com/?random=verse');
        if (!response.ok) throw new Error('Failed to fetch the verse');
        
        const data = await response.json();
        verseElement.textContent = `${data.text} - ${data.reference}`;
    } catch (error) {
        verseElement.textContent = 'Error fetching verse. Please try again.';
        console.error(error);
    }
});
