
export default (/** @type {PodEpisode}*/episode) => {
  return `
    <li class="show-item theme-dark-item-bg">
      <div>
        <h3 class="show-item__title">${episode.title}</h3>
        <div class="show-item__description">${episode.description}</div>
        <div class="show-item__time">${getDaysAgoText(episode.pubDate)}</div>
      </div>
      <div class="play" data-url=${episode.enclosure['@attributes'].url}></div>
    </li>
  `.trim();
}

function getDaysAgoText(dateString) {
  const msSincePublished = Date.now() - Date.parse(dateString);
  const daysAgo = Math.floor( msSincePublished / (24*60*60*1000) );
  if(daysAgo === 0) return 'Today';
  if(daysAgo === 1) return 'Yesterday';
  return `${daysAgo} days ago`;
}
