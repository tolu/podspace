"use strict";
import episodeComponent from './episode.js';
export const component = (show) => {
    const image = getImage(show);
    return `
  <div>
    <h2><img src="${image}" style="width:100px">&nbsp;${show.title}</h2>
  <div>
  <ul>
    ${show.items.map(episodeComponent).join('\n')}
  </ul>
`.trim();
};
export default component;
function getImage(pod) {
    if (pod.image_files && pod.image_files.length) {
        return pod.image_files[0].file.thumb.url;
    }
    if (pod.image_urls) {
        return pod.image_urls.thumb;
    }
}
