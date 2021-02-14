import {IEnv} from "../env/IEnv";

export interface ILocatorFactory {
    create(env: IEnv): any;
}
