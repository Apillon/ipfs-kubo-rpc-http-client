export declare class Pin {
    private url;
    constructor(url: string);
    add(params: {
        /**
         * Path to object(s) to be pinned
         */
        cids: string[];
    }): Promise<boolean>;
    /**
     * List pinned paths.
     * @param params
     * @returns Array of keys
     */
    ls(params: {
        cid?: string;
    }): Promise<string[]>;
    rm(params: {
        /**
         * Path to object(s) to be unpinned
         */
        cids: string[];
    }): Promise<boolean>;
}
//# sourceMappingURL=pin.d.ts.map