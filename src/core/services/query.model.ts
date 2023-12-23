export interface IGraphQlQuery<T> {
    query: string;
    variables?: T;
}

export interface IRestApiOptions<T> {
    method?: string;
    body?: T;
    url: string;
}
