"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name = void 0;
const axios_1 = __importDefault(require("axios"));
const client_error_1 = require("../types/client-error");
class Name {
    constructor(url) {
        this.url = url;
    }
    async publish(params) {
        let urlParameters = ``;
        urlParameters += params.key ? `&key=${params.key}` : "&key=self";
        urlParameters += params.resolve ? `&resolve=true` : "&resolve=false";
        urlParameters += params.ttl ? `&ttl=${params.ttl}` : "";
        try {
            const res = await axios_1.default.post(`${this.url}/name/publish?arg=${params.cid}${urlParameters}`);
            console.info(res);
            return res.data;
        }
        catch (err) {
            throw new client_error_1.ClientError(err);
        }
    }
}
exports.Name = Name;
//# sourceMappingURL=name.js.map