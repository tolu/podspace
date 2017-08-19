
const KEY = 'podspace_config';
const config = JSON.parse(localStorage.getItem(KEY) || 'null') || {};

export const get = (key) => {
  return config[key];
}

export const set = (key, value) => {
  config[key] = value;
  localStorage.setItem(KEY, JSON.stringify(config));
}

export default { get, set };

fetch('../config/config.json')
  .then(res => res.json())
  .then(configData => {
    Object.assign(config, configData);
});
