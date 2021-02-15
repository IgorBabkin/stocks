import {IEnv} from "../env/IEnv";
import {ILocatorFactory} from "./ILocatorFactory";
import {ITradesRepositoryKey} from "../repositories/trades/ITradesRepository";
import {TestTradesRepository} from "../repositories/trades/TestTradesRepository";

export class DevLocatorFactory implements ILocatorFactory {
    constructor(private locatorFactory: ILocatorFactory) {
    }

    create(env: IEnv) {
        const locator = this.locatorFactory.create(env);
        locator.registerConstructor(ITradesRepositoryKey, TestTradesRepository, {resolving: 'perScope'});
        return locator;
    }
}
