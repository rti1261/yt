function playNextVideo() {
    const nextButton = document.querySelector('a.ytp-next-button');
    if (nextButton) {
        nextButton.click();
        console.log("Next video played. Generating random wait time...");

        let waitTime = Math.floor(Math.random() * (120 - 60 + 1) + 60) * 1000;
        console.log(`Waiting for ${waitTime / 1000} seconds before playing the next video.`);

        setTimeout(playNextVideo, waitTime);
    } else {
        console.log("Next button not found, stopping execution.");
    }
}

function getYouTubeVideoId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("v");
}

function checkVideoIdAndStart() {
    chrome.storage.sync.get("specialVideoID", function (data) {
        let specialVideoID = data.specialVideoID;

        if (getYouTubeVideoId() === specialVideoID) {
            console.log("Video ID matched! Starting 2-minute countdown...");
            setTimeout(playNextVideo, 120000);
        } else {
            console.log("Video ID does not match. Checking again in 5 seconds...");
            setTimeout(checkVideoIdAndStart, 5000);
        }
    });
}

checkVideoIdAndStart();
