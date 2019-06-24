export interface Log {
    index: number;
    meta: { title: string; description: string };
    silent?: boolean;
    error?: null | { name: string; message: string; stack: string };
    storeBefore?: object;
    storeAfter?: object;
}