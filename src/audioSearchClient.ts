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

function base64Encode(str: string){
  return btoa(str);
}

async function get(path: string){
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
  async search(query: string) {
    const timer = 'audioSearch';
    console.time(timer);
    const data = await get(`search/shows/${encodeURI(query)}`) as SearchResults;
    console.timeEnd(timer);
    return data;
  }
  async getEpisodes(show_id: string){
    const timer = 'getEpisodes';
    console.time(timer);
    const data = await get(`shows/${show_id}/episodes`) as Episode[];
    console.timeEnd(timer);
    return data;
  }
}

export default new AudioSearchClient();
