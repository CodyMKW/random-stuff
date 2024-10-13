document.getElementById('goButton').addEventListener('click', function() {
    const urlInput = document.getElementById('url').value;
    let formattedUrl = urlInput;

    // Check if the input includes protocol
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'http://' + formattedUrl;
    }

    document.getElementById('browserFrame').src = formattedUrl;
});
