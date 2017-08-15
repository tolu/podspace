const SHOWS = 'pod_shows';

export const saveShow  = (showData) => {
  const shows = getShows();
  const show = shows.find((s) => s.id === showData.id);
  if(show) {
    // we already have show - update?
    console.warn('show already in list...');
  } else {
    shows.push(showData);
  }
  localStorage.setItem(SHOWS, JSON.stringify(shows));
};

export const getShows = () => {
  const showData = localStorage.getItem(SHOWS);
  return showData ? JSON.parse(showData) : [];
};

export const getShow = (id) => {
  const shows = getShows();
  return shows.find((s) => s.id === id);
};
