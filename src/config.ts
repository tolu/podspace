// read config from localStorage and assign with data from network
const KEY = 'podspace_config';
const config = JSON.parse(localStorage.getItem(KEY) || '{}');
const promise = (async function getConfig() {
  const res = await fetch(`${location.pathname}config/config.json`);
  const configData = await res.json();
  const env = /localhost/i.test(location.hostname) ?  'dev' : 'prod';
  Object.assign(config, configData[env]);
  return config;
}());

export const get = (key) => {
  return config[key];
}

export const set = (key, value) => {
  config[key] = value;
  localStorage.setItem(KEY, JSON.stringify(config));
}

export const ready = () => {
  return promise;
}

export default { get, set, ready };
