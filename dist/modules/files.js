"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Files = void 0;
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const client_error_1 = require("../types/client-error");
const stream = __importStar(require("stream"));
var unirest = require("unirest");
class Files {
    constructor(url) {
        this.url = url;
    }
    async write(params) {
        params.create = params.create || true;
        params.parents = params.parents || true;
        try {
            if (params.content instanceof stream.Readable) {
                await new Promise((resolve, reject) => {
                    unirest("POST", `${this.url}/files/write?arg=${params.path}&cid-version=1&create=${params.create}&parents=${params.parents}`)
                        .attach("file", params.content)
                        .end(function (res) {
                        if (res.error) {
                            reject(new Error(res.error));
                        }
                        resolve(true);
                    });
                });
            }
            else {
                const form = new form_data_1.default();
                form.append("file", params.content);
                await axios_1.default.post(`${this.url}/files/write?arg=${params.path}&cid-version=1&create=${params.create}&parents=${params.parents}`, form);
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