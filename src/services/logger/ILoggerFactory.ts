import {ILogger} from "./ILogger";

export type ILoggerFactory = (prefix: string) => ILogger;
