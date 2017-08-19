import showPoster from './showPoster.js';
/**
 * Render search result items
 * @param {Podcast[]} results
 * @return {string} html markup
 */
export const component = (results) => {
  return results.map(podcast => {
    console.info({podcast});
    const image = getImage(podcast);
    const artist = (podcast.network || {name:''}).name;
    const {
      rss_url: feedUrl,
      title
    } = podcast;
    return `
      <div class="search-result list-item">
        <div class='spinner'>
          <div class='rect1'></div>
          <div class='rect2'></div>
          <div class='rect3'></div>
          <div class='rect4'></div>
          <div class='rect5'></div>
        </div>
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
