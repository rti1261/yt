chrome.runtime.onInstalled.addListener(() => {
  console.log("YouTube Auto Enhancer Installed!");
  console.log("Mouse Tracker Spoofer Extension Installed");

  // Save the tracking data (hardcoded example, you can modify it to load dynamically if needed)
  chrome.storage.local.set({
    trackingData: [
      { time: '2025-03-16T11:02:42.495Z', event: 'mousemove', element: 'YTD-MESSAGE-RENDERER', x: 286, y: 655 },
      { time: '2025-03-16T11:02:42.501Z', event: 'mousemove', element: 'YTD-MESSAGE-RENDERER', x: 288, y: 653 },
      { time: '2025-03-16T11:02:42.510Z', event: 'mousemove', element: 'YTD-MESSAGE-RENDERER', x: 289, y: 653 },
      // Add more events here...
    ]
  });

  // Optionally, log that the data has been stored
  console.log("Tracking data saved to local storage.");
});
