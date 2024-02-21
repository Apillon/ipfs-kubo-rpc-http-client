"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpfsKuboRpcHttpClient = void 0;
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const client_error_1 = require("../types/client-error");
const files_1 = require("./files");
const key_1 = require("./key");
const name_1 = require("./name");
const pin_1 = require("./pin");
class IpfsKuboRpcHttpClient {
    constructor(url) {
        this.url = url;
        this.files = new files_1.Files(url);
        this.key = new key_1.Key(url);
        this.name = new name_1.Name(url);
        this.pin = new pin_1.Pin(url);
    }
    async add(params) {
        try {
            const form = new form_data_1.default();
            form.append("file", params.content, {
                filename: params.fileName,
                contentType: params.contentType,
            });
            const res = await axios_1.default.post(`${this.url}/add?cid-version=1`, form);
            res.data.Size = +res.data.Size;
            return res.data;
        }
        catch (err) {
            throw new client_error_1.ClientError(err);
        }
    }
}
exports.IpfsKuboRpcHttpClient = IpfsKuboRpcHttpClient;
//# sourceMappingURL=ipfs-http-client.js.map