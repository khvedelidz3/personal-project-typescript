export namespace Schema {
    export interface Log {
        index: number;
        meta: { title: string; description: string };
        error: null | { name: string; message: string; stack: string };
        silent?: boolean;
        storeBefore?: object;
        storeAfter?: object;
    }

    export interface Scenario {
        index: number;
        meta: { title: string; description: string };
        call: (store: object) => any;
        silent?: boolean;
        restore?: () => any;
    }
}
