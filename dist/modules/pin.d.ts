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
//# sourceMappingURL=pin.d.ts.map