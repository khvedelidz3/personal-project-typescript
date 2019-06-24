export interface Scenario {
    index: number;
    meta: { title: string; description: string };
    call: (store: object) => any;
    silent?: boolean;
    restore?: () => any;
}