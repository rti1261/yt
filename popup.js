document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("specialVideoURL");
    const saveButton = document.getElementById("saveURL");

    // Load stored video ID
    chrome.storage.sync.get("specialVideoID", function (data) {
        if (data.specialVideoID) {
            input.value = `https://www.youtube.com/watch?v=${data.specialVideoID}`;
        }
    });

    // Extract Video ID and Save
    saveButton.addEventListener("click", function () {
        const url = input.value.trim();
        try {
            const videoID = new URL(url).searchParams.get("v");
            if (videoID) {
                chrome.storage.sync.set({ specialVideoID: videoID }, function () {
                    alert("Special video ID saved!");
                });
            } else {
                alert("Invalid YouTube URL");
            }
        } catch (e) {
            alert("Invalid URL format");
        }
    });
});
