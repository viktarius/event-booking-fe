import { injectable } from 'inversify';
import { RequestService } from './request.service';
import { ILoginRequestBody, IRegisterRequestBody } from '../models/request';
import { ISuccessAuthorizeResponse } from '../models/response';

export interface IAuthRequestService {
    auth: () => Promise<ISuccessAuthorizeResponse>;
    login: (body: ILoginRequestBody) => Promise<ISuccessAuthorizeResponse>;
    register: (body: IRegisterRequestBody) => Promise<ISuccessAuthorizeResponse>;
}

@injectable()
export class AuthRequestService extends RequestService implements IAuthRequestService {
    public login(body: ILoginRequestBody): Promise<ISuccessAuthorizeResponse> {
        return this.restApi({
            url: 'login',
            method: 'POST',
            body
        })
    }

    public register(body: IRegisterRequestBody): Promise<ISuccessAuthorizeResponse> {
        return this.restApi({
            url: 'register',
            method: 'POST',
            body
        })

    }

    public auth(): Promise<ISuccessAuthorizeResponse> {
        return this.restApi({
            url: 'auth',
            method: 'GET'
        })
    }
}
