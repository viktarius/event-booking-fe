export interface IGraphQlQuery<T> {
    query: string;
    variables?: T;
}
