import {IEnv} from "../env/IEnv";
import {ILocatorFactory} from "./ILocatorFactory";

export class ProdLocatorFactory implements ILocatorFactory {
    constructor(private locatorFactory: ILocatorFactory) {
    }

    create(env: IEnv) {
        return this.locatorFactory.create(env);
    }
}
