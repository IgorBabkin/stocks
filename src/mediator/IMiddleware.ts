export interface IMiddleware<GQuery> {
    preProcess(query: GQuery): Promise<void>;
}
