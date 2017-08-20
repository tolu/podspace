// based on https://github.com/popuparchive/audiosearch-client-node/blob/master/index.js
import config from './config.js';
config.get('token')
const host = config.get.bind(null, 'audio_service');

async function authorize(){
  const tokenService = config.get('token_service');
  const res = await fetch(`${tokenService}/token`);
  const data = await res.json();
  console.log('Got access token...', data);
  config.set('token', data.access_token);
  return data.access_token;
}

function base64Encode(str){
  return btoa(str);
}

async function get(path){
  var url = `${host()}/api/${path}`;
  var options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${config.get('token')}`,
      'User-Agent': 'request'
    }
  };
  if(!config.get('token')) {
    await authorize();
  }
  const res = await fetch(url, options);
  const data = await res.json();
  return data;
}

class AudioSearchClient {
  /**
   * @param {string} query
   * @returns {Promise<SearchResults>}
   * @memberof AudioSearchClient
   */
  async search(query) {
    const timer = 'audioSearch';
    console.time(timer);
    const data = await get(`search/shows/${encodeURI(query)}`);
    console.timeEnd(timer);
    return data;
  }
  /**
   * @param {string} show_id
   * @returns {Promise<Episode[]>}
   * @memberof AudioSearchClient
   */
  async getEpisodes(show_id){
    const timer = 'getEpisodes';
    console.time(timer);
    const data = await get(`shows/${show_id}/episodes`);
    console.timeEnd(timer);
    return data;
  }
}

export default new AudioSearchClient();
