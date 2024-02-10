import { IClientError } from "./types";

export class ClientError implements IClientError {
  status: number;
  statusText: string;
  message: string;
  error?: any;

  constructor(err: any) {
    console.error(err);
    this.error = err;

    //Handle response error
    if (this.error.response) {
      this.status = this.error.response?.status;
      this.statusText = this.error.response?.statusText;
      this.message = this.error.response.data?.Message;

      if (!this.message && typeof this.error.response.data === "string") {
        this.message = this.error.response.data;
      }
    }
    if (this.error.errors) {
      //Handle Axios API error
      this.status = 400;
      this.statusText = this.error.code;
      this.message = this.error.errors[0].message;
    }
  }
}
