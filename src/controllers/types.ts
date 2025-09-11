export interface HttpRequest<TBody = any, TParams = any, TQuery = any> {
    body?: TBody;
    params?: TParams;
    query?: TQuery;
}
