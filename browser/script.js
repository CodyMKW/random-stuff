// Function to handle navigation when "Go" button is clicked or Enter is pressed
function navigateToPage() {
    let urlInput = document.getElementById('url').value.trim();
    let formattedUrl = urlInput;

    // Try to detect if protocol is missing and fix it
    if (!formattedUrl.match(/^https?:\/\//)) {
        formattedUrl = 'http://' + formattedUrl;
    }

    document.getElementById('browserFrame').src = formattedUrl;
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
