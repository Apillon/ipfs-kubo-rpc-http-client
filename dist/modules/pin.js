"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pin = void 0;
const axios_1 = __importDefault(require("axios"));
const client_error_1 = require("../types/client-error");
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
            throw new client_error_1.ClientError(err);
        }
    }
    /**
     * List pinned paths.
     * @param params
     * @returns Array of keys
     */
    async ls(params) {
        try {
            const res = await axios_1.default.post(`${this.url}/pin/ls${params.cid ? "?arg=" + params.cid : ""}`);
            console.info(res);
            return Object.keys(res.data.Keys);
        }
        catch (err) {
            throw new client_error_1.ClientError(err);
        }
    }
    async rm(params) {
        try {
            const res = await axios_1.default.post(`${this.url}/pin/rm`, {}, { params: { arg: params.cids }, paramsSerializer: { indexes: null } });
            console.info(res);
            return true;
        }
        catch (err) {
            throw new client_error_1.ClientError(err);
        }
    }
}
exports.Pin = Pin;
//# sourceMappingURL=pin.js.map