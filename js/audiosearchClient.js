// based on https://github.com/popuparchive/audiosearch-client-node/blob/master/index.js
import config from './config.js';

const host = config.get.bind(null, 'audio_service');

function authorize(){
  return fetch('http://localhost:3000/token').then(res => res.json()).then((res) => {
    console.log('Got access token...', res);
    config.set('token', res.access_token);
    return res.access_token;
  });
}

function base64Encode(str){
  return btoa(str);
}

function get(path){
  var url = `${host()}/api/${path}`;
  var options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${config.get('token')}`,
      'User-Agent': 'request'
    }
  };
  if(config.get('token')) {
    return fetch(url, options).then(res => res.json());
  } else {
    return authorize().then(() => get(path));
  }
}

class AudioSearchClient {
  /**
   * @param {string} query 
   * @returns {Promise<AudioSearchResults>}
   * @memberof AudioSearchClient
   */
  search(query){
    return get(`/search/shows/${encodeURI(query)}`);
  }
}

export default new AudioSearchClient();
