import { Pokemon } from '../models/pokemon';

export class Repo {
    url = 'https://pokeapi.co/api/v2/pokemon/';

    load() {
        return fetch(this.url).then((result) => {
            if (!result.ok)
                throw new Error(`Error ${result.status}: ${result.statusText}`);
            return result.json().then((res) => {
                return res.results;
            });
        });
    }
    query(id: string) {
        return fetch(this.url + id).then((result) => {
            if (!result.ok)
                throw new Error(`Error ${result.status}: ${result.statusText}`);
            return result.json();
        });
    }
    create(payload: Partial<Pokemon>) {
        return fetch(this.url, {
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
    update(payload: Partial<Pokemon>) {
        if (!payload.id) throw new Error('invalid ID');
        return fetch(this.url + payload.id, {
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
    delete(id: string) {
        if (!id) throw new Error('invalid ID');
        return fetch(this.url + id, {
            method: 'DELETE',
        }).then((result) => {
            if (!result.ok)
                throw new Error(`Error ${result.status}: ${result.statusText}`);
            return id;
        });
    }
}
