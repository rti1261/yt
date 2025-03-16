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

  // Sync the tracking data with the current time
  function synchronizeWithRealTime() {
    const currentTime = new Date().getTime();
    const firstEventTime = timeToMilliseconds(trackingData[0].time);
    const timeDifference = currentTime - firstEventTime;

    // Adjust the timestamps of each event based on the current time
    return trackingData.map(entry => {
      const adjustedTime = timeToMilliseconds(entry.time) + timeDifference;
      return {
        ...entry,
        time: new Date(adjustedTime).toISOString(),
      };
    });
  }

  // Function to simulate the events in order, now synchronized with real-time
  function simulateEvents() {
    const adjustedTrackingData = synchronizeWithRealTime();
    
    adjustedTrackingData.forEach((entry, index) => {
      const { time, event, x, y } = entry;
      const adjusted = adjustCoordinates(x, y);

      // Wait for the correct time to simulate the event
      setTimeout(() => {
        simulateMouseEvent(event, adjusted.x, adjusted.y);
      }, timeToMilliseconds(time) - timeToMilliseconds(adjustedTrackingData[0].time));
    });
  }

  // Start the simulation
  simulateEvents();
});
