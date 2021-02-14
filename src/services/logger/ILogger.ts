export const ILoggerKey = Symbol('ILogger');
export interface ILogger {
    log(...args: any[]): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
}
