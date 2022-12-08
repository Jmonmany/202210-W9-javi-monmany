import { Pokemon } from '../models/pokemon';

export class Repo {
    load(url: string) {
        return fetch(url).then((result) => {
            if (!result.ok)
                throw new Error(`Error ${result.status}: ${result.statusText}`);
            return result.json().then((res) => {
                return res
            });
        });
    }
    query(url: string, id: string) {
        return fetch(url + id).then((result) => {
            if (!result.ok)
                throw new Error(`Error ${result.status}: ${result.statusText}`);
            return result.json();
        });
    }
    create(url: string, payload: Partial<Pokemon>) {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
            },
        }).then((result) => {
            if (!result.ok)
                throw new Error(`Error ${result.status}: ${result.statusText}`);
            return result.json();
        });
    }
    update(url: string, payload: Partial<Pokemon>) {
        if (!payload.id) throw new Error('invalid ID');
        return fetch(url + payload.id, {
            method: 'PATCH',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
            },
        }).then((result) => {
            if (!result.ok)
                throw new Error(`Error ${result.status}: ${result.statusText}`);
            return result.json();
        });
    }
    delete(url: string, id: string) {
        if (!id) throw new Error('invalid ID');
        return fetch(url + id, {
            method: 'DELETE',
        }).then((result) => {
            if (!result.ok)
                throw new Error(`Error ${result.status}: ${result.statusText}`);
            return id;
        });
    }
}
