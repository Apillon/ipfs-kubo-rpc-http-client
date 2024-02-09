import { IClientError } from "./types";

export class ClientError implements IClientError {
  status: number;
  statusText: string;
  message: string;
  error?: any;

  constructor(err: any) {
    console.error(err);
    this.error = err;
    this.status = this.error.response.status;
    this.statusText = this.error.response.statusText;
    this.message = this.error.response.data?.Message;

    if (!this.message && typeof this.error.response.data === "string") {
      this.message = this.error.response.data;
    }
  }
}
