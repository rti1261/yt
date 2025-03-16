chrome.storage.local.get("trackingData", function(result) {
  const trackingData = result.trackingData || [];

  // Convert time to milliseconds for easier processing
  function timeToMilliseconds(time) {
    return new Date(time).getTime();
  }

  // Function to simulate mouse event
  function simulateMouseEvent(type, x, y) {
    const event = new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
    });
    document.dispatchEvent(event);
  }

  // Adjust coordinates for any device or resized screen
  function adjustCoordinates(x, y) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const maxWidth = 1920;  // Assuming the original video dimension or desired resolution
    const maxHeight = 1080;

    // Scale the coordinates based on the current screen size
    const adjustedX = (x / maxWidth) * screenWidth;
    const adjustedY = (y / maxHeight) * screenHeight;

    return { x: adjustedX, y: adjustedY };
  }

  // Function to simulate the events in order
  function simulateEvents() {
    trackingData.forEach((entry, index) => {
      const { time, event, x, y } = entry;
      const adjusted = adjustCoordinates(x, y);

      // Wait for the correct time to simulate the event
      setTimeout(() => {
        simulateMouseEvent(event, adjusted.x, adjusted.y);
      }, timeToMilliseconds(time) - timeToMilliseconds(trackingData[0].time));
    });
  }

  // Start the simulation
  simulateEvents();
});
