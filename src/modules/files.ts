import axios from "axios";
import FormData from "form-data";
import { ClientError } from "../types/client-error";
import { IEntry, IStat } from "../types/types";

export class Files {
  private url: string;
  constructor(url: string) {
    this.url = url;
  }

  public async write(params: {
    content: any;
    path: string;
    create?: boolean;
    parents?: boolean;
    rawLeaves?: boolean;
  }): Promise<boolean> {
    params.create = params.create || true;
    params.parents = params.parents || true;

    try {
      const form = new FormData();
      form.append("file", params.content);

      let receivedMessage = "";
      const url = new URL(
        `${this.url}/files/write?arg=${params.path}&cid-version=1&create=${
          params.create
        }&parents=${params.parents}${
          params.rawLeaves == false ? "&raw-leaves=false" : ""
        }`
      );

      await new Promise((resolve, reject) => {
        form.submit(
          {
            host: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
          },
          (err, res) => {
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
          }
        );
      });

      if (receivedMessage) {
        throw new Error(receivedMessage);
      }

      return true;
    } catch (err) {
      throw new ClientError(err);
    }
  }

  /**
   * List all entries (files and directories) for path
   * @param params
   * @returns
   */
  public async ls(params: { path?: string }): Promise<IEntry[]> {
    try {
      const res = await axios.post(
        `${this.url}/files/ls?long=1${params.path ? "&arg=" + params.path : ""}`
      );
      return res.data.Entries;
    } catch (err) {
      throw new ClientError(err);
    }
  }

  /**
   * Get properties of a object in given path
   * @param params
   * @returns
   */
  public async stat(params: { path: string }): Promise<IStat> {
    try {
      const objectStat = (
        await axios.post(`${this.url}/files/stat?arg=${params.path}`)
      ).data;
      console.info(objectStat);
      return objectStat;
    } catch (err) {
      throw new ClientError(err);
    }
  }
}
