import axios from "axios";
import { ClientError } from "../types/client-error";

export class Pin {
  private url: string;
  constructor(url: string) {
    this.url = url;
  }

  public async add(params: {
    /**
     * Path to object(s) to be pinned
     */
    cids: string[];
  }): Promise<boolean> {
    try {
      const res = await axios.post(
        `${this.url}/pin/add`,
        {},
        { params: { arg: params.cids }, paramsSerializer: { indexes: null } }
      );
      console.info(res);
      return true;
    } catch (err) {
      throw new ClientError(err);
    }
  }

  /**
   * List pinned paths.
   * @param params
   * @returns Array of keys
   */
  public async ls(params: { cid?: string }): Promise<string[]> {
    try {
      const res = await axios.post(
        `${this.url}/pin/ls${params.cid ? "?arg=" + params.cid : ""}`
      );
      console.info(res);
      return Object.keys(res.data.Keys);
    } catch (err) {
      throw new ClientError(err);
    }
  }

  public async rm(params: {
    /**
     * Path to object(s) to be unpinned
     */
    cids: string[];
  }): Promise<boolean> {
    try {
      const res = await axios.post(
        `${this.url}/pin/rm`,
        {},
        { params: { arg: params.cids }, paramsSerializer: { indexes: null } }
      );
      console.info(res);
      return true;
    } catch (err) {
      throw new ClientError(err);
    }
  }
}
