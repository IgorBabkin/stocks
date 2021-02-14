import {ServiceLocatorFactory} from "ts-ioc-container";
import {IEnv} from "../env/IEnv";
import {ILocatorFactory} from "./ILocatorFactory";
import {ILoggerKey} from "../services/ILogger";
import {Logger} from "../services/Logger";

export class LocatorFactory implements ILocatorFactory {
    private locatorFactory = new ServiceLocatorFactory();

    constructor() {
    }

    create(env: IEnv) {
        const locator = this.locatorFactory.createIoCLocator();
        locator.registerConstructor(ILoggerKey, Logger);
        return locator;
    }
}
