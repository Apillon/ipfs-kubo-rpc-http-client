"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pin = exports.Name = exports.Key = exports.Files = exports.IpfsKuboRpcHttpClient = exports.ClientError = void 0;
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
//#endregion
//#region classes
class ClientError {
    constructor(err) {
        var _a;
        console.error(err);
        this.error = err;
        this.status = this.error.response.status;
        this.statusText = this.error.response.statusText;
        this.message = (_a = this.error.response.data) === null || _a === void 0 ? void 0 : _a.Message;
        if (!this.message && typeof this.error.response.data === 'string') {
            this.message = this.error.response.data;
        }
    }
}
exports.ClientError = ClientError;
//#endregion
class IpfsKuboRpcHttpClient {
    constructor(url) {
        this.url = url;
        this.files = new Files(url);
        this.key = new Key(url);
        this.name = new Name(url);
        this.pin = new Pin(url);
    }
    async add(params) {
        try {
            const form = new form_data_1.default();
            form.append('file', params.content);
            const res = await axios_1.default.post(`${this.url}/add?cid-version=1`, form);
            return res.data;
        }
        catch (err) {
            throw new ClientError(err);
        }
    }
}
exports.IpfsKuboRpcHttpClient = IpfsKuboRpcHttpClient;
class Files {
    constructor(url) {
        this.url = url;
    }
    async write(params) {
        params.create = params.create || true;
        params.parents = params.parents || true;
        const form = new form_data_1.default();
        form.append('file', params.content);
        try {
            await axios_1.default.post(`${this.url}/files/write?arg=${params.path}&cid-version=1&create=${params.create}&parents=${params.parents}`, form);
            return true;
        }
        catch (err) {
            throw new ClientError(err);
        }
    }
    /**
     * List all entries (files and directories) for path
     * @param params
     * @returns
     */
    async ls(params) {
        try {
            const res = await axios_1.default.post(`${this.url}/files/ls?long=1${params.path ? '&arg=' + params.path : ''}`);
            return res.data.Entries;
        }
        catch (err) {
            throw new ClientError(err);
        }
    }
    /**
     * Get properties of a object in given path
     * @param params
     * @returns
     */
    async stat(params) {
        try {
            const objectStat = (await axios_1.default.post(`${this.url}/files/stat?arg=${params.path}`)).data;
            console.info(objectStat);
            return objectStat;
        }
        catch (err) {
            throw new ClientError(err);
        }
    }
}
exports.Files = Files;
class Key {
    constructor(url) {
        this.url = url;
    }
    async gen(params) {
        let urlParameters = '';
        urlParameters += params.type ? `&type=${params.type}` : '';
        urlParameters += params.size ? `&size=${params.size}` : '';
        try {
            const res = await axios_1.default.post(`${this.url}/key/gen?arg=${params.name}${urlParameters}`);
            console.info(res);
            return res.data;
        }
        catch (err) {
            throw new ClientError(err);
        }
    }
}
exports.Key = Key;
class Name {
    constructor(url) {
        this.url = url;
    }
    async publish(params) {
        let urlParameters = ``;
        urlParameters += params.key ? `&key=${params.key}` : '&key=self';
        urlParameters += params.resolve ? `&resolve=true` : '&resolve=false';
        urlParameters += params.ttl ? `&ttl=${params.ttl}` : '';
        try {
            const res = await axios_1.default.post(`${this.url}/name/publish?arg=${params.cid}${urlParameters}`);
            console.info(res);
            return res.data;
        }
        catch (err) {
            throw new ClientError(err);
        }
    }
}
exports.Name = Name;
class Pin {
    constructor(url) {
        this.url = url;
    }
    async add(params) {
        try {
            const res = await axios_1.default.post(`${this.url}/pin/add`, {}, { params: { arg: params.cids }, paramsSerializer: { indexes: null } });
            console.info(res);
            return true;
        }
        catch (err) {
            throw new ClientError(err);
        }
    }
    async ls(params) {
        try {
            const res = await axios_1.default.post(`${this.url}/pin/ls${params.cid ? '?arg=' + params.cid : ''}`);
            console.info(res);
            return res.data.Keys;
        }
        catch (err) {
            throw new ClientError(err);
        }
    }
    async rm(params) {
        try {
            const res = await axios_1.default.post(`${this.url}/pin/rm`, {}, { params: { arg: params.cids }, paramsSerializer: { indexes: null } });
            console.info(res);
            return true;
        }
        catch (err) {
            throw new ClientError(err);
        }
    }
}
exports.Pin = Pin;
//# sourceMappingURL=ipfs-http-client.js.map