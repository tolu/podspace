import episodeComponent from './episode.js';

export default (show, showImageUrl) => {
  return `
  <div>
    <h2><img src="${showImageUrl}" style="width:100px">&nbsp;${ show.title }</h2>
  <div>
  <ul>
    ${show.item.map(episodeComponent).join('\n')}
  </ul>
`.trim();
};
