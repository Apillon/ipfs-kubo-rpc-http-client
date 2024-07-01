import FormData from "form-data";
import { ClientError } from "../types/client-error";
import { IAddResult, IVersion } from "../types/types";
import { Files } from "./files";
import { Key } from "./key";
import { Name } from "./name";
import { Pin } from "./pin";
import axios from "axios";

export class IpfsKuboRpcHttpClient {
  private url: string;

  public files: Files;
  public key: Key;
  public name: Name;
  public pin: Pin;

  constructor(url: string) {
    this.url = url;
    if (this.url.endsWith("/")) {
      this.url = this.url.slice(0, -1);
    }
    this.files = new Files(url);
    this.key = new Key(url);
    this.name = new Name(url);
    this.pin = new Pin(url);
  }

  /**
   * Add content to ipfs
   * https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-add
   * @param params
   * @returns Hash and size of uploaded content
   */
  public async add(params: {
    content: any;
    fileName?: string;
    contentType?: string;
    pin?: boolean;
  }): Promise<IAddResult> {
    try {
      const form = new FormData();
      form.append("file", params.content, {
        filename: params.fileName,
        contentType: params.contentType,
      });

      const url = new URL(
        `${this.url}/add?cid-version=1&pin=${params.pin ? "true" : "false"}`
      );
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

  /**
   * Get IPFS version data
   * https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-version
   * @param timeout defaults to 0, which means no timeout
   * @returns
   */
  public async version(timeout = 0): Promise<IVersion> {
    try {
      const res = await axios.post(`${this.url}/version`, {}, { timeout });
      return res.data;
    } catch (err) {
      throw new ClientError(err);
    }
  }

  /**
   * Convert CIDs to Base32 CID version 1
   * https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-cid-base32
   * @param cid cid to convert
   * @returns string cidV1
   */
  public async cidToCidV1(cid: string): Promise<string> {
    try {
      const res = await axios.post(`${this.url}/cid/base32?arg=${cid}`, {}, {});
      return res.data?.Formatted;
    } catch (err) {
      throw new ClientError(err);
    }
  }
}
