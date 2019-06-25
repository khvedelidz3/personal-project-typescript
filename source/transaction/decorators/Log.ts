import { Scenario } from "../schema/Schema";

export function logs(enabled: boolean) {
    return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
        if (!enabled) {
            descriptor.value = async function(scenario: Scenario[]) {
                scenario.sort((a, b) => a.index - b.index);
                this.validate(scenario);

                const n = scenario.length;

                for (let i = 0; i < n; i++) {

                    try {
                        await scenario[i].call(this.store);
                    } catch (err) {
                        if (!scenario[i].hasOwnProperty("silent") && !scenario[i].silent) {
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
                            this.store = null;
                            return;
                        }
                    }
                }
            };
        }
    };
}
