// Function to convert degrees to radians
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

// Function to calculate the distance between two coordinates using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Function to get the user's location and calculate the distance to Peoria, Arizona
function updateGeolocationDistance() {
    fetch('https://ipinfo.io/json?token=672d2a95991cd3') // Replace with your API key
        .then(response => response.json())
        .then(data => {
            const [userLat, userLon] = data.loc.split(',').map(Number); // Get user's latitude and longitude
            const peoriaLat = 33.5806; // Latitude for Peoria, Arizona
            const peoriaLon = -112.2374; // Longitude for Peoria, Arizona
            const distance = calculateDistance(userLat, userLon, peoriaLat, peoriaLon); // Calculate distance in miles
            document.getElementById('geolocation-distance').textContent = distance.toFixed(2); // Display distance in miles
        })
        .catch(error => console.error('Error fetching geolocation:', error)); // Handle errors
}

// Call the function to update the geolocation distance
updateGeolocationDistance();
