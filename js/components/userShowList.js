import showPoster from './showPoster.js';
/**
 * Render search result items
 * @param {Podcast[]} userShows
 * @return {string} html markup
 */
export const component = (userShows) => {
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

/**
 * @param {Podcast} pod 
 */
function getImage(pod){
  if(pod.image_files && pod.image_files.length){
    return pod.image_files[0].file.thumb.url;
  }
  if(pod.image_urls){
    return pod.image_urls.thumb;
  }
}
