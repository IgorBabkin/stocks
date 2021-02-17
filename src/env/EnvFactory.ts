import {EnvName, IEnv} from "./IEnv";

export class EnvFactory {
    create(): IEnv {
        return {
            name: process.env.NODE_ENV as EnvName
        }
    }
}
