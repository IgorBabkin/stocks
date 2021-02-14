import {ISomeService} from "./ISomeService";

export class SomeService implements ISomeService {
    findSmth(): Promise<number> {
        return Promise.resolve(12);
    }
}
