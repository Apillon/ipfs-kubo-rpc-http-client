import { ClientError } from "../types/client-error";
import { IAddResult } from "../types/types";
import { Files } from "./files";
import { Key } from "./key";
import { Name } from "./name";
import { Pin } from "./pin";
import axios from "axios";
import FormData from "form-data";
var unirest = require("unirest");
import * as stream from "stream";

export class IpfsKuboRpcHttpClient {
  private url: string;

  public files: Files;
  public key: Key;
  public name: Name;
  public pin: Pin;

  constructor(url: string) {
    this.url = url;
    this.files = new Files(url);
    this.key = new Key(url);
    this.name = new Name(url);
    this.pin = new Pin(url);
  }

  public async add(params: {
    content: any;
    fileName?: string;
    contentType?: string;
  }): Promise<IAddResult> {
    try {
      //Readable streams are uploaded with unirest library - can handle upload without loading stream into memory
      if (params.content instanceof stream.Readable) {
        const res: any = await new Promise((resolve, reject) => {
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
      } else {
        const form = new FormData();
        form.append("file", params.content, {
          filename: params.fileName,
          contentType: params.contentType,
        });

        const res = await axios.post(`${this.url}/add?cid-version=1`, form);

        res.data.Size = +res.data.Size;
        return res.data;
      }
    } catch (err) {
      throw new ClientError(err);
    }
  }
}
