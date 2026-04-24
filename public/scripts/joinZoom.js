document.getElementById("joinZoomButton").addEventListener("click", function() {
  fetch("/api/masterclass/join")
    .then(response => response.json())
    .then(data => {
      console.log("Received Zoom Data:", data); // Log data to check the Zoom link
      if (data.ok && data.zoomLink) {
        console.log("Redirecting to Zoom link:", data.zoomLink);  // Log the Zoom link before redirect
        window.location.href = data.zoomLink;  // Redirect to Zoom link
      } else {
        alert("Error: " + data.error);  // Show error if Zoom link is missing
      }
    })
    .catch(error => alert("An error occurred: " + error));
});

