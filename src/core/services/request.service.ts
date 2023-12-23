import { injectable } from 'inversify';
import { IRestApiOptions } from './query.model';

@injectable()
export class RequestService {
    protected async graphql<T, Y>(body: Y): Promise<T> {
        const res = await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        const result = await res.json()
        if (![200, 201].includes(res.status)) {
            throw new Error(result.errors[0].message);
        }
        return result;
    }

    protected async restApi<TResponse, TBody>({ url, method, body }: IRestApiOptions<TBody>): Promise<TResponse> {
        const init: RequestInit = {
            method: method || 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        if (body) {
            init.body = JSON.stringify(body);
        }
        const res = await fetch(`http://localhost:3000/${ url }`, init)
        const result = await res.json()
        if (![200, 201].includes(res.status)) {
            throw new Error(result.errors[0].message);
        }
        return result;
    }
}
