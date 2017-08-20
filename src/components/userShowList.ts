import showPoster from './showPoster.js';

export const component = (userShows: Podcast[]) => {
  return userShows.map(podcast => {
    const image = getImage(podcast);
    const artist = (podcast.network || {name:''}).name;
    const {
      rss_url: feedUrl,
      title,
    } = podcast;
    return `
      <div class="list-item user-show">
        ${showPoster({feedUrl, image, artist, title})}
      </div>
    `.trim();
  }).join('\n');
};

export default component;

function getImage(pod: Podcast){
  if(pod.image_files && pod.image_files.length){
    return pod.image_files[0].file.thumb.url;
  }
  if(pod.image_urls){
    return pod.image_urls.thumb;
  }
}
