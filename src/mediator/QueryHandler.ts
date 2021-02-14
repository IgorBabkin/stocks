import { IQueryHandler } from './IQueryHandler';

export abstract class QueryHandler<GPayload, GResult> implements IQueryHandler<GPayload, GResult> {
    public abstract handle(payload: GPayload): Promise<GResult>;

    public async preHandle(payload: GPayload): Promise<void> {}
}
