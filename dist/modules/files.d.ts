import { IEntry, IStat } from "../types/types";
export declare class Files {
    private url;
    constructor(url: string);
    write(params: {
        content: any;
        path: string;
        create?: boolean;
        parents?: boolean;
        rawLeaves?: boolean;
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
//# sourceMappingURL=files.d.ts.map