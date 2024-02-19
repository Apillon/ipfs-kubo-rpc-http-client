import axios from "axios";
import { ClientError } from "../types/client-error";
import { INamePublishResult } from "../types/types";

export class Name {
  private url: string;
  constructor(url: string) {
    this.url = url;
  }

  public async publish(params: {
    cid: string;
    key: string;
    resolve: boolean;
    ttl?: string;
  }): Promise<INamePublishResult> {
    let urlParameters = ``;
    urlParameters += params.key ? `&key=${params.key}` : "&key=self";
    urlParameters += params.resolve ? `&resolve=true` : "&resolve=false";
    urlParameters += params.ttl ? `&ttl=${params.ttl}` : "";

    try {
      const res = await axios.post(
        `${this.url}/name/publish?arg=${params.cid}${urlParameters}`
      );
      console.info(res);
      return res.data;
    } catch (err) {
      throw new ClientError(err);
    }
  }
}
