// Backend URL (replace with your backend URL from Replit or Render)
const backendUrl = 'https://your-backend-url/log';

// Function to send data to the backend
function sendDataToBackend(data) {
    fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(response => console.log("Data sent successfully"))
    .catch(error => console.error("Error sending data:", error));
}

// Function to get location
function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        const data = {
            type: 'location',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        };
        sendDataToBackend(data);
    }, (error) => {
        const data = { type: 'location', error: error.message };
        sendDataToBackend(data);
    });
}

// Function to access camera
function accessCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            const data = { type: 'camera', status: 'access granted' };
            sendDataToBackend(data);
        })
        .catch((error) => {
            const data = { type: 'camera', status: 'access denied', error: error.message };
            sendDataToBackend(data);
        });
}
