export interface IAddResult {
    Hash: string;
    Size: number;
}
export interface IObject {
    Hash: string;
    Links: IEntry[];
}
export interface IClientError {
    status: number;
    statusText: string;
    message: string;
    error?: any;
}
export interface IStat {
    Hash: string;
    Size: number;
    CumulativeSize: number;
    /**
     * file, directory
     */
    Type: string;
}
export interface IEntry {
    Name: string;
    /**
     * 0 = file, 1 = directory
     */
    Type: number;
    Hash: string;
    /**
     * 0 if directory, greater otherwise
     */
    Size: number;
}
export interface IKeyGenResult {
    Id: string;
    Name: string;
}
export interface INamePublishResult {
    Name: string;
    Value: string;
}
export declare class ClientError implements IClientError {
    status: number;
    statusText: string;
    message: string;
    error?: any;
    constructor(err: any);
}
export declare class IpfsKuboRpcHttpClient {
    private url;
    files: Files;
    key: Key;
    name: Name;
    pin: Pin;
    constructor(url: string);
    add(params: {
        content: any;
    }): Promise<IAddResult>;
}
export declare class Files {
    private url;
    constructor(url: string);
    write(params: {
        content: any;
        path: string;
        create?: boolean;
        parents?: boolean;
    }): Promise<boolean>;
    /**
     * List all entries (files and directories) for path
     * @param params
     * @returns
     */
    ls(params: {
        path?: string;
    }): Promise<IEntry[]>;
    /**
     * Get properties of a object in given path
     * @param params
     * @returns
     */
    stat(params: {
        path: string;
    }): Promise<IStat>;
}
export declare class Key {
    private url;
    constructor(url: string);
    gen(params: {
        name: string;
        type?: string;
        size?: number;
    }): Promise<IKeyGenResult>;
}
export declare class Name {
    private url;
    constructor(url: string);
    publish(params: {
        cid: string;
        key: string;
        resolve: boolean;
        ttl?: string;
    }): Promise<INamePublishResult>;
}
export declare class Pin {
    private url;
    constructor(url: string);
    add(params: {
        /**
         * Path to object(s) to be pinned
         */
        cids: string[];
    }): Promise<boolean>;
    ls(params: {
        cid?: string;
    }): Promise<any>;
    rm(params: {
        /**
         * Path to object(s) to be unpinned
         */
        cids: string[];
    }): Promise<boolean>;
}
//# sourceMappingURL=ipfs-http-client.d.ts.map