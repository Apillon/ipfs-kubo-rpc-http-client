"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Key = void 0;
const axios_1 = __importDefault(require("axios"));
const client_error_1 = require("../types/client-error");
class Key {
    constructor(url) {
        this.url = url;
    }
    async gen(params) {
        let urlParameters = "";
        urlParameters += params.type ? `&type=${params.type}` : "";
        urlParameters += params.size ? `&size=${params.size}` : "";
        try {
            const res = await axios_1.default.post(`${this.url}/key/gen?arg=${params.name}${urlParameters}`);
            console.info(res);
            return res.data;
        }
        catch (err) {
            throw new client_error_1.ClientError(err);
        }
    }
}
exports.Key = Key;
//# sourceMappingURL=key.js.map