
export default (episode: Episode) => {
  const audio = episode.audio_files[0];
  return `
    <li class="show-item theme-dark-item-bg">
      <div>
        <h3 class="show-item__title">${episode.title}</h3>
        <div class="show-item__description">${episode.description}</div>
        <div class="show-item__time">${getDaysAgoText(episode.date_created)} - <small>${audio.duration}</small></div>
      </div>
      <div class="play" data-url=${audio.mp3}></div>
    </li>
  `.trim();
}

function pad(number){
  return `${number}`.padStart(2, '0');
}

function getDaysAgoText(dateString) {
  const msSincePublished = Date.now() - Date.parse(dateString);
  const daysAgo = Math.floor( msSincePublished / (24*60*60*1000) );
  if(daysAgo === 0) return 'Today';
  if(daysAgo === 1) return 'Yesterday';
  return `${daysAgo} days ago`;
}
