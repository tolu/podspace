const supportsMediaSession = 'mediaSession' in navigator;

export default {
  play(episode: Episode){
    const audio = document.querySelector('audio');

    const mp3Url = episode.audio_files[0].mp3;

    if(audio.currentSrc !== mp3Url) {
      audio.src = mp3Url;
      updateMediaSessionData(episode, audio);
    } else if(audio.ended) {
      audio.currentTime = 0;
    }

    audio.paused ? audio.play() : audio.pause();
    return !audio.paused;
  }
}

function updateMediaSessionData(episode: Episode, audio: HTMLAudioElement) {
  if(!supportsMediaSession){
    console.warn('Client does not support media session api');
    return;
  }
episode.image_urls.thumb
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
  navigator.mediaSession.setActionHandler('seekbackward', () => {
    const time = Math.max(audio.currentTime - 15, 0);
  });
  navigator.mediaSession.setActionHandler('seekforward', () => {
    const time = Math.max(audio.currentTime - 15, 0);
  });
  navigator.mediaSession.setActionHandler('previoustrack', () => {
    // nope
  });
  navigator.mediaSession.setActionHandler('nexttrack', () => {
    // not until we have a queue
  });
}
