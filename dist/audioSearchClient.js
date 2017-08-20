"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// based on https://github.com/popuparchive/audiosearch-client-node/blob/master/index.js
import config from './config.js';
config.get('token');
const host = config.get.bind(null, 'audio_service');
function authorize() {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenService = config.get('token_service');
        const res = yield fetch(`${tokenService}/token`);
        const data = yield res.json();
        console.log('Got access token...', data);
        config.set('token', data.access_token);
        return data.access_token;
    });
}
function base64Encode(str) {
    return btoa(str);
}
function get(path) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!config.get('token')) {
            console.info('Refreshing API token...');
            yield authorize();
        }
        var url = `${host()}/api/${path}`;
        var options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${config.get('token')}`,
                'User-Agent': 'request'
            }
        };
        const res = yield fetch(url, options);
        if (!res.ok && res.status === 401) {
            console.info('token might have expired, reset and try again');
            config.set('token', '');
            return get(path);
        }
        const data = yield res.json();
        return data;
    });
}
class AudioSearchClient {
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const timer = 'audioSearch';
            console.time(timer);
            const data = yield get(`search/shows/${encodeURI(query)}`);
            console.timeEnd(timer);
            return data;
        });
    }
    getEpisodes(show_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const timer = 'getEpisodes';
            console.time(timer);
            const data = yield get(`shows/${show_id}/episodes`);
            console.timeEnd(timer);
            return data;
        });
    }
}
export default new AudioSearchClient();
