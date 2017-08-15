import showPoster from './showPoster.js';
/**
 * Render search result items
 * @param {Podcast[]} userShows
 * @return {string} html markup
 */
export default (userShows) => {
  return userShows.map(podcast => {
    const {
      feedUrl,
      artworkUrl600: image,
      artistName: artist,
      collectionName: title
    } = podcast;
    return `
      <div class="list-item user-show">
        ${showPoster({feedUrl, image, artist, title})}
      </div>
    `.trim();
  }).join('\n');
};
