"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Files = void 0;
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const client_error_1 = require("../types/client-error");
class Files {
    constructor(url) {
        this.url = url;
    }
    async write(params) {
        params.create = params.create || true;
        params.parents = params.parents || true;
        try {
            const form = new form_data_1.default();
            form.append("file", params.content);
            let receivedMessage = "";
            const url = new URL(`${this.url}/files/write?arg=${params.path}&cid-version=1&create=${params.create}&parents=${params.parents}`);
            await new Promise((resolve, reject) => {
                form.submit({
                    host: url.hostname,
                    port: url.port,
                    path: url.pathname + url.search,
                }, (err, res) => {
                    if (err) {
                        throw err;
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
            if (receivedMessage) {
                throw new Error(receivedMessage);
            }
            return true;
        }
        catch (err) {
            throw new client_error_1.ClientError(err);
        }
    }
    /**
     * List all entries (files and directories) for path
     * @param params
     * @returns
     */
    async ls(params) {
        try {
            const res = await axios_1.default.post(`${this.url}/files/ls?long=1${params.path ? "&arg=" + params.path : ""}`);
            return res.data.Entries;
        }
        catch (err) {
            throw new client_error_1.ClientError(err);
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
            throw new client_error_1.ClientError(err);
        }
    }
}
exports.Files = Files;
//# sourceMappingURL=files.js.map