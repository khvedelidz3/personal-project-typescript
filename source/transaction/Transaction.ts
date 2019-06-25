import { logs } from "./decorators/Log";
import { Scenario } from "./schema/Schema";
import { Log } from "./schema/Schema";

export class Transaction {
    public store: object | null;
    public logs: Log[];

    constructor() {
        this.store = {};
        this.logs = [];
    }

    @logs(true)
    public async dispatch(scenario: Scenario[]) {
        scenario.sort((a, b) => a.index - b.index);

        this.validate(scenario);

        const n = scenario.length;

        for (let i = 0; i < n; i++) {
            let storeBefore = {};
            let storeAfter = {};
            const log: Log = {
                error: null,
                index: scenario[i].index,
                meta: {
                    description: scenario[i].meta.description,
                    title: scenario[i].meta.title,
                },
            };

            storeBefore = { ...this.store };

            try {
                await scenario[i].call(this.store);

                log.storeBefore = storeBefore;
                storeAfter = { ...this.store };
                log.storeAfter = storeAfter;

                this.logs.push(log);
            } catch (err) {
                storeAfter = { ...this.store };

                log.error = {
                    message: err.message,
                    name: err.name,
                    stack: err.stack,
                };

                if (scenario[i].hasOwnProperty("silent") && scenario[i].silent) {
                    log.silent = true;
                    log.storeBefore = storeBefore;
                    log.storeAfter = storeAfter;

                    this.logs.push(log);
                } else {
                    this.logs.push(log);

                    for (i = i - 1; i >= 0; i--) {
                        try {
                            const obj = scenario[i];
                            if (obj.restore) {
                                obj.restore();
                            }
                        } catch (err) {
                            throw err;
                        }
                    }
                }
                this.store = null;
                return;
            }
        }
    }

    protected validate(scenario: Scenario[]): void {
        if (scenario[scenario.length - 1].hasOwnProperty("restore")) {
            throw new Error(`restore method is extra`);
        }

        const mySet = new Set(scenario.map((x) => x.index).filter((x) => x >= 0));

        if (mySet.size !== scenario.length) {
            throw new Error(`index value can't be duplicated or negative`);
        }
    }
}
