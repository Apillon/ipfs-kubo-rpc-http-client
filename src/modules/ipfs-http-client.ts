import FormData from "form-data";
import { ClientError } from "../types/client-error";
import { IAddResult } from "../types/types";
import { Files } from "./files";
import { Key } from "./key";
import { Name } from "./name";
import { Pin } from "./pin";

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
      const form = new FormData();
      form.append("file", params.content, {
        filename: params.fileName,
        contentType: params.contentType,
      });

      const url = new URL(`${this.url}/add?cid-version=1`);
      let receivedMessage = "";
      await new Promise((resolve, reject) => {
        form.submit(
          {
            host: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
          },
          (err, res) => {
            if (err) {
              throw new ClientError(err);
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
          }
        );
      });

      if (receivedMessage.includes("Hash")) {
        const ipfsRes = receivedMessage.substring(
          receivedMessage.indexOf("{"),
          receivedMessage.indexOf("}") + 1
        );

        const res = JSON.parse(ipfsRes);
        res.Size = +res.Size;
        return res;
      }
      throw new ClientError(new Error(receivedMessage));
    } catch (err) {
      throw new ClientError(err);
    }
  }
}
