import {ServiceLocatorFactory} from "ts-ioc-container";
import {IEnv} from "../env/IEnv";
import {ILocatorFactory} from "./ILocatorFactory";
import {ILoggerKey} from "../services/logger/ILogger";
import {Logger} from "../services/logger/Logger";
import {ISomeServiceKey} from "../services/someService/ISomeService";
import {SomeService} from "../services/someService/SomeService";

export class LocatorFactory implements ILocatorFactory {
    private locatorFactory = new ServiceLocatorFactory();

    constructor() {
    }

    create(env: IEnv) {
        const locator = this.locatorFactory.createIoCLocator();
        locator.registerConstructor(ILoggerKey, Logger);
        locator.registerConstructor(ISomeServiceKey, SomeService);
        return locator;
    }
}
