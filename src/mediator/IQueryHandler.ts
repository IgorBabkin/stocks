export interface IQueryHandler<GPayload, GResult> {
    preHandle(payload: GPayload): Promise<void>;

    handle(payload: GPayload): Promise<GResult>;
}
