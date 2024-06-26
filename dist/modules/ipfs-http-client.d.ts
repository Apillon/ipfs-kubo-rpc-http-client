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
    /**
     * Add content to ipfs
     * https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-add
     * @param params
     * @returns Hash and size of uploaded content
     */
    add(params: {
        content: any;
        fileName?: string;
        contentType?: string;
        pin?: boolean;
    }): Promise<IAddResult>;
    /**
     * Get IPFS version data
     * https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-version
     * @param timeout defaults to 0, which means no timeout
     * @returns
     */
    version(timeout?: number): Promise<IVersion>;
    /**
     * Convert CIDs to Base32 CID version 1
     * https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-cid-base32
     * @param cid cid to convert
     * @returns string cidV1
     */
    cidToCidV1(cid: string): Promise<string>;
}
//# sourceMappingURL=ipfs-http-client.d.ts.map