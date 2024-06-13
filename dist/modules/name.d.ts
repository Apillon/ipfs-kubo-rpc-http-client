import { INamePublishResult } from "../types/types";
export declare class Name {
    private url;
    constructor(url: string);
    publish(params: {
        cid: string;
        key: string;
        resolve: boolean;
        ttl?: string;
        lifetime?: string;
    }): Promise<INamePublishResult>;
}
//# sourceMappingURL=name.d.ts.map