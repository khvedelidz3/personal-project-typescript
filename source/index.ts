import { Log } from "./transaction/schema/Schema";
import { Scenario } from "./transaction/schema/Schema";
import { Transaction } from "./transaction/Transaction";

const scenario: Scenario[] = [
    {
        call: async (store: object) => {
            console.log("call 1");
        },
        index: 1,
        meta: {
            description: "This action is responsible for reading the most popular customers",
            title: "Read popular customers",
        },
    },
    {
        call: async (store: object) => {
            console.log("call 2");
        },
        index: 2,
        meta: {
            description: "second description",
            title: "second title",
        },
    },
];

const transaction = new Transaction();

(async () => {
    try {
        await transaction.dispatch(scenario);
        const store = transaction.store;
        const logs: Log[] = transaction.logs;
        console.log(store);
        console.log(logs);
    } catch (err) {
        console.log(err);
    }
})();
