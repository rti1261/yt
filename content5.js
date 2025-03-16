(function () {
    // Override document.hidden and document.visibilityState
    Object.defineProperty(document, 'hidden', {
        get: () => false,
        configurable: true
    });

    Object.defineProperty(document, 'visibilityState', {
        get: () => 'visible',
        configurable: true
    });

    // Continuously enforce the properties every second in case they get reset
    setInterval(() => {
        try {
            Object.defineProperty(document, 'hidden', {
                get: () => false,
                configurable: true
            });

            Object.defineProperty(document, 'visibilityState', {
                get: () => 'visible',
                configurable: true
            });
        } catch (e) {
            console.error('Error reinforcing visibility state:', e);
        }
    }, 1000);

    // Spoof window focus and blur events
    const originalAddEventListener = window.addEventListener;
    window.addEventListener = function (type, listener, options) {
        if (type === 'blur') return; // Block blur events entirely
        if (type === 'focus') listener(); // Immediately call focus listeners
        originalAddEventListener.call(window, type, listener, options);
    };

    // Manually dispatch focus event
    window.dispatchEvent(new Event('focus'));

    console.log('Tab visibility spoofing active');

function randomPausePlay() {
  let video = document.querySelector('video');
  if (!video) return;

  let interval = [618000, 768000, 876000][Math.floor(Math.random() * 3)];

  setInterval(() => {
    if (!video.paused) {
      // Simulate pressing 'K' to pause
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', code: 'KeyK', keyCode: 75, which: 75 }));

      let randomPlayDelay = [1000, 2000, 3000, 4000][Math.floor(Math.random() * 4)];

      setTimeout(() => {
        // Simulate pressing 'K' to resume
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', code: 'KeyK', keyCode: 75, which: 75 }));
      }, randomPlayDelay);
    }
  }, interval);
}


    // Function to skip the video ahead by a random time every random interval
    function randomSkip() {
      let video = document.querySelector('video');
      if (video) {
        let skipTimes = [7.5, 11.3, 14.8];
        let intervals = [318000, 444000, 168000, 564000]; 

        setInterval(() => {
          let randomSkipTime = skipTimes[Math.floor(Math.random() * skipTimes.length)];
          video.currentTime += randomSkipTime;
        }, intervals[Math.floor(Math.random() * intervals.length)]);
      }
    }

    // Function to randomly scroll down and then back up with random timings
    function randomScroll() {
      setInterval(() => {
        let scrollAmount = Math.floor(Math.random() * 21) + 20;
        window.scrollBy(0, scrollAmount);

        let scrollBackTime = [1500, 2000, 3400][Math.floor(Math.random() * 3)];
        
        setTimeout(() => {
          window.scrollBy(0, -scrollAmount);
        }, scrollBackTime);
      }, [58000, 70000, 100000][Math.floor(Math.random() * 3)]);
    }

    // Function to auto-resume the video if paused for 1 minute
    function autoResumeVideo() {
      let video = document.querySelector('video');
      let pauseStartTime = null;

      if (video) {
        setInterval(() => {
          if (video.paused) {
            if (!pauseStartTime) {
              pauseStartTime = Date.now();
            } else {
              const pausedDuration = (Date.now() - pauseStartTime) / 1000;
              if (pausedDuration >= 60) {
                video.play();
                pauseStartTime = null;
              }
            }
          } else {
            pauseStartTime = null;
          }
        }, 1000);
      }
    }

    // Start random pause/play, skip, random scroll, and auto resume
    randomPausePlay();
    randomSkip();
    randomScroll();
    autoResumeVideo();
})();
