import {IEnv} from "../env/IEnv";
import {ILocatorFactory} from "./ILocatorFactory";

export class DevLocatorFactory implements ILocatorFactory {
    constructor(private locatorFactory: ILocatorFactory) {
    }

    create(env: IEnv) {
        return this.locatorFactory.create(env);
    }
}
