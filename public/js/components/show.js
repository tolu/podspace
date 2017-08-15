import episodeComponent from './episode.js';

export default (/** @type {Podcast} */show) => {
  return `
  <div>
    <h2><img src="${show.artworkUrl600}" style="width:100px">&nbsp;${ show.collectionName }</h2>
  <div>
  <ul>
    ${show.items.map(episodeComponent).join('\n')}
  </ul>
`.trim();
};
