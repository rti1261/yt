function setVideoQuality() {
    let qualityMenu = document.querySelector('.ytp-settings-button');
    if (qualityMenu) {
        qualityMenu.click();
        setTimeout(() => {
            let qualityOptions = document.querySelectorAll('.ytp-menuitem');
            qualityOptions[qualityOptions.length - 1].click();
            setTimeout(() => {
                let resolutions = document.querySelectorAll('.ytp-menuitem');
                resolutions.forEach(item => {
                    if (item.innerText.includes('144p')) {
                        item.click();
                    }
                });
            }, 500);
        }, 500);
    }
}
