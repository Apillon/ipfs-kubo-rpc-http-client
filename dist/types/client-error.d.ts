import { IClientError } from "./types";
export declare class ClientError implements IClientError {
    status: number;
    statusText: string;
    message: string;
    error?: any;
    constructor(err: any);
}
//# sourceMappingURL=client-error.d.ts.map