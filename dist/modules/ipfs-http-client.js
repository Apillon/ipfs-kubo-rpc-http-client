"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpfsKuboRpcHttpClient = void 0;
const form_data_1 = __importDefault(require("form-data"));
const client_error_1 = require("../types/client-error");
const files_1 = require("./files");
const key_1 = require("./key");
const name_1 = require("./name");
const pin_1 = require("./pin");
const axios_1 = __importDefault(require("axios"));
class IpfsKuboRpcHttpClient {
    constructor(url) {
        this.url = url;
        if (this.url.endsWith("/")) {
            this.url = this.url.slice(0, -1);
        }
        this.files = new files_1.Files(url);
        this.key = new key_1.Key(url);
        this.name = new name_1.Name(url);
        this.pin = new pin_1.Pin(url);
    }
    /**
     * Add content to ipfs
     * https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-add
     * @param params
     * @returns Hash and size of uploaded content
     */
    async add(params) {
        try {
            const form = new form_data_1.default();
            form.append("file", params.content, {
                filename: params.fileName,
                contentType: params.contentType,
            });
            params.pin = params.pin || true;
            const url = new URL(`${this.url}/add?cid-version=1&pin=${params.pin ? "true" : "false"}`);
            let receivedMessage = "";
            await new Promise((resolve, reject) => {
                form.submit({
                    host: url.hostname,
                    port: url.port,
                    path: url.pathname + url.search,
                }, (err, res) => {
                    if (err) {
                        throw new client_error_1.ClientError(err);
                    }
                    res.on("data", (data) => {
                        receivedMessage += data.toString();
                    });
                    res.on("end", () => {
                        resolve(true);
                    });
                    res.on("error", (data) => {
                        reject(data);
                    });
                });
            });
            if (receivedMessage.includes("Hash")) {
                const ipfsRes = receivedMessage.substring(receivedMessage.indexOf("{"), receivedMessage.indexOf("}") + 1);
                const res = JSON.parse(ipfsRes);
                res.Size = +res.Size;
                return res;
            }
            throw new client_error_1.ClientError(new Error(receivedMessage));
        }
        catch (err) {
            throw new client_error_1.ClientError(err);
        }
    }
    /**
     * Get IPFS version data
     * https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-version
     * @param timeout defaults to 0, which means no timeout
     * @returns
     */
    async version(timeout = 0) {
        try {
            const res = await axios_1.default.post(`${this.url}/version`, {}, { timeout });
            return res.data;
        }
        catch (err) {
            throw new client_error_1.ClientError(err);
        }
    }
}
exports.IpfsKuboRpcHttpClient = IpfsKuboRpcHttpClient;
//# sourceMappingURL=ipfs-http-client.js.map