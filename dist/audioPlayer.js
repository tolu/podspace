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
    },
    offline(episode) {
        const mediaUrl = `${episode.audio_files[0].audiosearch_mp3}?offline=true`;
        episode.audio_files[0].audiosearch_mp3 = mediaUrl;
        // keep track of that this file is downloaded somehow?
        // mark that episode is downloaded
        /* these approaches works if remote server sets CORS headers */
        // navigator.serviceWorker.controller.postMessage({type:'save_offline', mp3: mediaUrl });
        // const audio = document.createElement('audio');
        // audio.src = `${mediaUrl}?offline=true`;
        // saveEpisode(episode);
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
