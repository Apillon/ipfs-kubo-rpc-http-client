import axios from "axios";
import FormData from "form-data";
import {
  IAddResult,
  IEntry,
  IKeyGenResult,
  INamePublishResult,
  IStat,
} from "../types/types";
import { ClientError } from "../types/client-error";
import { Files } from "./files";

export class Key {
  private url: string;
  constructor(url: string) {
    this.url = url;
  }

  public async gen(params: {
    name: string;
    type?: string;
    size?: number;
  }): Promise<IKeyGenResult> {
    let urlParameters = "";
    urlParameters += params.type ? `&type=${params.type}` : "";
    urlParameters += params.size ? `&size=${params.size}` : "";

    try {
      const res = await axios.post(
        `${this.url}/key/gen?arg=${params.name}${urlParameters}`
      );
      console.info(res);
      return res.data;
    } catch (err) {
      throw new ClientError(err);
    }
  }
}
