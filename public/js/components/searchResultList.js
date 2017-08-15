/**
 * Render search result items
 * @param {SearchResults} data
 * @return {string} html markup
 */
export default (data) => {
  return data.results.map(podcast => {
    return `
      <div class="result-item">
        <div class='spinner'>
          <div class='rect1'></div>
          <div class='rect2'></div>
          <div class='rect3'></div>
          <div class='rect4'></div>
          <div class='rect5'></div>
        </div>
        <a data-rss-feed="${podcast.feedUrl}" href="#">
          <img src="${podcast.artworkUrl600}" title="${podcast.artistName}">
        </a>
        <div>${podcast.collectionName}</div>
      </div>
    `.trim();
  }).join('\n');
};
