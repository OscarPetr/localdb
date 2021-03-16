declare const fs: any;
declare const path: any;
declare class Dababase {
    filepath: string;
    idUsage: boolean;
    source: string;
    constructor(options?: {
        filepath?: string;
        idUsage?: boolean;
    });
    load(): void;
    insert(entries: object, callback: (err: Error) => void): void;
    query(entry: object, callback: (err: Error, query: any) => void): void;
    queryAll(entry: object, callback: (err: Error, query: any[]) => void): void;
    remove(entry: object, callback: (err: Error) => void): void;
    removeAll(entries: object, callback: (err: Error) => void): void;
    update(from: object, to: object, callback: (err: Error) => void): void;
}
declare function generate(length: number): string;
