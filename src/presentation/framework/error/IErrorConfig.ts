import {constructor} from "../commonTypes";

export interface IErrorConfig {
    badRequest: Array<constructor<Error>>;
    notFound: Array<constructor<Error>>;
}
