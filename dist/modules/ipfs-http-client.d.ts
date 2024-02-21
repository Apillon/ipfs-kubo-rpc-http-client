import { IAddResult } from "../types/types";
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
}
//# sourceMappingURL=ipfs-http-client.d.ts.map