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
exports.IpfsKuboRpcHttpClient = void 0;
const client_error_1 = require("../types/client-error");
const files_1 = require("./files");
const key_1 = require("./key");
const name_1 = require("./name");
const pin_1 = require("./pin");
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
var unirest = require("unirest");
const stream = __importStar(require("stream"));
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
            //Readable streams are uploaded with unirest library - can handle upload without loading stream into memory
            if (params.content instanceof stream.Readable) {
                const res = await new Promise((resolve, reject) => {
                    unirest("POST", `${this.url}/add?cid-version=1`)
                        .attach("file", params.content)
                        .end(function (res) {
                        if (res.error) {
                            reject(new Error(res.error));
                        }
                        console.log(res.raw_body);
                        resolve(JSON.parse(res.raw_body));
                    });
                });
                res.Size = +res.Size;
                return res;
            }
            else {
                const form = new form_data_1.default();
                form.append("file", params.content, {
                    filename: params.fileName,
                    contentType: params.contentType,
                });
                const res = await axios_1.default.post(`${this.url}/add?cid-version=1`, form);
                res.data.Size = +res.data.Size;
                return res.data;
            }
        }
        catch (err) {
            throw new client_error_1.ClientError(err);
        }
    }
}
exports.IpfsKuboRpcHttpClient = IpfsKuboRpcHttpClient;
//# sourceMappingURL=ipfs-http-client.js.map