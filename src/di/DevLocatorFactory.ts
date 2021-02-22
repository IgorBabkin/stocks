import {IEnv} from "../env/IEnv";
import {ILocatorFactory} from "./ILocatorFactory";
import {ITradesRepositoryKey} from "../repositories/trades/ITradesRepository";
import {TestTradesRepository} from "../repositories/trades/TestTradesRepository";
import {IUsersRepositoryKey} from "../repositories/users/IUsersRepository";
import {TestUsersRepository} from "../repositories/users/TestUsersRepository";
import {Provider} from "ts-ioc-container";

export class DevLocatorFactory implements ILocatorFactory {
    constructor(private locatorFactory: ILocatorFactory) {
    }

    create(env: IEnv) {
        const locator = this.locatorFactory.create(env);
        locator.register(ITradesRepositoryKey, Provider.fromConstructor(TestTradesRepository).asScoped());
        locator.register(IUsersRepositoryKey, Provider.fromConstructor(TestUsersRepository).asScoped());
        return locator;
    }
}
