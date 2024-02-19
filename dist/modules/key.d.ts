import { IKeyGenResult } from "../types/types";
export declare class Key {
    private url;
    constructor(url: string);
    gen(params: {
        name: string;
        type?: string;
        size?: number;
    }): Promise<IKeyGenResult>;
}
//# sourceMappingURL=key.d.ts.map