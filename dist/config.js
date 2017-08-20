"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// read config from localStorage and assign with data from network
const KEY = 'podspace_config';
const config = JSON.parse(localStorage.getItem(KEY) || '{}');
const promise = (function getConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${location.href}config/config.json`);
        const configData = yield res.json();
        const env = /localhost/i.test(location.hostname) ? 'dev' : 'prod';
        Object.assign(config, configData[env]);
        return config;
    });
}());
export const get = (key) => {
    return config[key];
};
export const set = (key, value) => {
    config[key] = value;
    localStorage.setItem(KEY, JSON.stringify(config));
};
export const ready = () => {
    return promise;
};
export default { get, set, ready };
