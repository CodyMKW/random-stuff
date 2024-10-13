function navigateToPage() {
    let urlInput = document.getElementById('url').value.trim();
    let formattedUrl = urlInput;

    // If the input doesn't have a protocol, assume the user didn't specify one
    if (!formattedUrl.match(/^https?:\/\//)) {
        // Try to fetch using 'https://' first
        formattedUrl = 'https://' + urlInput;
        
        fetch(formattedUrl, { method: 'HEAD' })
            .then(() => {
                // If HTTPS works, navigate to the HTTPS version
                document.getElementById('browserFrame').src = formattedUrl;
            })
            .catch(() => {
                // If HTTPS fails, try HTTP
                formattedUrl = 'http://' + urlInput;
                document.getElementById('browserFrame').src = formattedUrl;
            });
    } else {
        // If the protocol was already provided (http/https), load the page
        document.getElementById('browserFrame').src = formattedUrl;
    }
}

// Add event listener for "Go" button
document.getElementById('goButton').addEventListener('click', navigateToPage);

// Add event listener for pressing "Enter" in the input field
document.getElementById('url').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        navigateToPage();
    }
});

// Update address bar when iframe URL changes
document.getElementById('browserFrame').addEventListener('load', function() {
    const iframeUrl = document.getElementById('browserFrame').contentWindow.location.href;
    document.getElementById('url').value = iframeUrl;
});
