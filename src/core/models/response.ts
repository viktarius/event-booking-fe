export interface IResponseResult<T> {
    data: T
}

export interface ISuccessAuthorizeResponse {
    isAuthorized: boolean;
    userId: string;
}
