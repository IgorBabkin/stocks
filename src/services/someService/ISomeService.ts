export const ISomeServiceKey = Symbol("ISomeService");
export interface ISomeService {
    findSmth(): Promise<number>;
}

