import { from, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'

export default class HttpService {

    private readonly POST = 'POST';
    private readonly PUT = 'PUT';
    private readonly DELETE = 'DELETE';

    private apiUrl: string = 'http://localhost:3200';
    private resource: string;

    public constructor(resource: string) {
        this.resource = resource;
    }

    public getAll(action: string, next?: (data: any) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        return from(fetch(`${this.apiUrl}/${this.resource}/${action}`)
        ).pipe(map(response => response.json())).subscribe(next, error, complete);
    }

    public getById(action: string, id: number, next?: (data: any) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        return from(fetch(`${this.apiUrl}/${this.resource}/${action}${id}`)
        ).pipe(map(response => response.json())).subscribe(next, error, complete);
    }

    public post(action: string, body: any, next?: (data: any) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        return from(fetch(`${this.apiUrl}/${this.resource}/${action}`, {
            ...this.fetchOptions(this.POST, body)
        })).pipe(map(response => response.json())).subscribe(next, error, complete);
    }

    public put(action: string, body: any, id: number, next?: (data: any) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        return from(fetch(`${this.apiUrl}/${this.resource}/${action}${id}`, {
            ...this.fetchOptions(this.PUT, body)
        })).pipe(map(response => response.json())).subscribe(next, error, complete);
    }

    public delete(action: string, id: number, next?: (data: any) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        return from(fetch(`${this.apiUrl}/${this.resource}/${action}${id}`, {
            ...this.fetchOptions(this.DELETE)
        })).pipe(map(response => response.json())).subscribe(next, error, complete);
    }

    private fetchOptions(httpVerb: string, body?: any, ): any {
        return {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            method: httpVerb
        }
    }

}