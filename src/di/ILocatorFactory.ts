import {IEnv} from "../env/IEnv";
import {IServiceLocator} from "ts-ioc-container";

export interface ILocatorFactory {
    create(env: IEnv): IServiceLocator;
}
