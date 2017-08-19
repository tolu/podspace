// read config from localStorage and assign with data from network
const KEY = 'podspace_config';
const config = JSON.parse(localStorage.getItem(KEY) || 'null') || {};
const promise = fetch('../config/config.json')
  .then(res => res.json())
  .then(configData => {
    Object.assign(config, configData);
    return config;
  });

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
