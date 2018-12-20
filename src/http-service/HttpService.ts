export default class HttpService {

    private readonly POST = 'POST';
    private readonly PUT = 'PUT';
    private readonly DELETE = 'DELETE';

    public apiUrl: string = 'http://localhost:3200';
    public resource: string;

    public constructor(resource: string) {
        this.resource = resource;
    }

    public async getAll(action: string) {
        const response = await fetch(`${this.apiUrl}/${this.resource}/${action}`);
        const json = await response.json();
        return json;
    }

    public async getById(action: string, id: number) {
        const response = await fetch(`${this.apiUrl}/${this.resource}/${action}${id}`);
        const json = await response.json();
        return json;
    }

    public async post(action: string, body: any) {
        const response = await fetch(`${this.apiUrl}/${this.resource}/${action}`, {
            headers: this.construirHeader(),
            body: JSON.stringify(body),
            method: this.POST
        });
        const json = await response.json();
        return json;
    }

    public async put(action: string, body: any, id: number) {
        const response = await fetch(`${this.apiUrl}/${this.resource}/${action}${id}`, {
            headers: this.construirHeader(),
            body: JSON.stringify(body),
            method: this.PUT
        });
        const json = await response.json();
        return json;
    }

    public async delete(action: string, id: number) {
        const response = await fetch(`${this.apiUrl}/${this.resource}/${action}${id}`, {
            headers: this.construirHeader(),
            method: this.DELETE
        });
        const json = await response.json();
        return json;
    }

    private construirHeader(): any {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        return headers;
    }

}