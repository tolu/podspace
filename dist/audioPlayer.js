"use strict";
export default {
    play(showMediaUrl) {
        const audio = document.querySelector('audio');
        if (audio.currentSrc !== showMediaUrl) {
            audio.src = showMediaUrl;
        }
        else if (audio.ended) {
            audio.currentTime = 0;
        }
        audio.paused ? audio.play() : audio.pause();
        return !audio.paused;
    }
};
