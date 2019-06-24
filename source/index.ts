import {Transaction} from './transaction/Transaction';
import {Schema} from './transaction/schema/Schema';

const scenario: Array<Schema.Scenario> = [
    {
        index: 1,
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers',
        },
        call: async (store: object) => {
        },
    },
    {
        index: 2,
        meta: {
            title: 'second title',
            description: 'second description'
        },
        call: async (store: object) => {
        },
    }
];

const transaction = new Transaction.Transaction();

(async () => {
    try {
        await transaction.dispatch(scenario);
        const store: null | object = transaction.store;
        const logs: Array<object> = transaction.logs;
        console.log(store)
        console.log(logs)
    } catch (err) {
        console.log(err);
    }
})();