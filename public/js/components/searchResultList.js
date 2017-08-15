import showPoster from './showPoster.js';
/**
 * Render search result items
 * @param {Podcast[]} results
 * @return {string} html markup
 */
export default (results) => {
  return results.map(podcast => {
    const {
      feedUrl,
      artworkUrl600: image,
      artistName: artist,
      collectionName: title
    } = podcast;
    return `
      <div class="result-item">
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
