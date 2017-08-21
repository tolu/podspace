"use strict";
const supportsMediaSession = 'mediaSession' in navigator;
export default {
    play(episode) {
        const audio = document.querySelector('audio');
        const mp3Url = episode.audio_files[0].audiosearch_mp3;
        if (audio.currentSrc !== mp3Url) {
            audio.src = mp3Url;
            updateMediaSessionData(episode, audio);
        }
        else if (audio.ended) {
            audio.currentTime = 0;
        }
        audio.paused ? audio.play() : audio.pause();
        return !audio.paused;
    }
};
function updateMediaSessionData(episode, audio) {
    if (!supportsMediaSession) {
        console.warn('Client does not support media session api');
        return;
    }
    navigator.mediaSession.metadata = new MediaMetadata({
        title: episode.title,
        artist: episode.show_title,
        album: '',
        artwork: [
            { src: episode.image_urls.thumb, sizes: '100x100', type: 'image/jpg' },
            { src: episode.image_urls.full, sizes: '600x600', type: 'image/jpg' },
        ]
    });
    navigator.mediaSession.setActionHandler('play', () => {
        audio.play();
    });
    navigator.mediaSession.setActionHandler('pause', () => {
        audio.pause();
    });
    const stepTime = 15;
    navigator.mediaSession.setActionHandler('seekbackward', () => {
        audio.currentTime = Math.max(audio.currentTime - stepTime, 0);
    });
    navigator.mediaSession.setActionHandler('seekforward', () => {
        audio.currentTime = Math.min(audio.currentTime + stepTime, audio.duration);
    });
    navigator.mediaSession.setActionHandler('previoustrack', null); // () => {});
    navigator.mediaSession.setActionHandler('nexttrack', null); // () => {});
}
