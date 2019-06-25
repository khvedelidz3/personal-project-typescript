import {Schema} from "../schema/Schema";

export namespace Log {
    export function logs(enabled: boolean) {
        return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
            if (!enabled) {
                descriptor.value = async function (scenario: Array<Schema.Scenario>) {
                    scenario.sort((a, b) => a.index - b.index);
                    this.validate(scenario);

                    let n = scenario.length;

                    for (let i = 0; i < n; i++) {

                        try {
                            await scenario[i].call(this.store);
                        } catch (err) {
                            if (!scenario[i].hasOwnProperty('silent') && !scenario[i].silent) {
                                for (i = i - 1; i >= 0; i--) {
                                    try {
                                        if (scenario[i].hasOwnProperty('restore')) {
                                            scenario[i].restore();
                                        }
                                    } catch (err) {
                                        throw err;
                                    }
                                }
                                this.store = null;
                                return;
                            }
                        }
                    }
                }
            }
        };
    }
}