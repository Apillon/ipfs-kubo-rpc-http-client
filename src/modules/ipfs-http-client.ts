import axios from "axios";
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

  public async add(params: { content: any }): Promise<IAddResult> {
    try {
      const form = new FormData();
      form.append("file", params.content);

      const res = await axios.post(`${this.url}/add?cid-version=1`, form);

      return res.data;
    } catch (err) {
      throw new ClientError(err);
    }
  }
}
