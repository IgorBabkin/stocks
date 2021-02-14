import { IMiddleware } from './IMiddleware';

export abstract class Middleware<GQuery> implements IMiddleware<GQuery> {
    public async preProcess(payload: GQuery): Promise<void> {}
}
