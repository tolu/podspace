
export default ({feedUrl, image, artist, title}) => {
  const data = {feedUrl, image, artist, title};
  return `
    <div class="podcast">
      <a href="${feedUrl}">
        <img src="${image}" title="${artist}">
      </a>
      <div>${title}</div>
    </div>`
};
