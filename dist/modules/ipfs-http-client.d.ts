import { IAddResult, IVersion } from "../types/types";
import { Files } from "./files";
import { Key } from "./key";
import { Name } from "./name";
import { Pin } from "./pin";
export declare class IpfsKuboRpcHttpClient {
    private url;
    files: Files;
    key: Key;
    name: Name;
    pin: Pin;
    constructor(url: string);
    add(params: {
        content: any;
        fileName?: string;
        contentType?: string;
    }): Promise<IAddResult>;
    /**
     * Get IPFS version data
     * @param timeout defaults to 0, which means no timeout
     * @returns
     */
    version(timeout?: number): Promise<IVersion>;
}
//# sourceMappingURL=ipfs-http-client.d.ts.map