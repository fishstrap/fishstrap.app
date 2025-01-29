async function downloadLatest() {
    try {
        const response = await fetch(`https://api.github.com/repos/returnrqt/fishstrap/releases/latest`);
        const data = await response.json();
        
        if (response.ok) {
            const downloadLinks = data.assets.map(asset => asset.browser_download_url);

            if (downloadLinks.length > 0) {
                window.location.href = downloadLinks[0];
            } else {
                console.error('Error fetching release data:', data.message);
            }                    }
    } catch (error) {
        console.error('erm how: ', error);
    }
}

document.getElementById('downloadbutton').addEventListener('click', function() {
    downloadLatest();
});