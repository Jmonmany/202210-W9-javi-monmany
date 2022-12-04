// Se puede usar type, interface o class

type PokemonType = {
    id: string;
    name: string;
    url: string;
};

export class Pokemon implements PokemonType {
    static generateId() {
        const aNumbers = new Uint32Array(1);
        crypto.getRandomValues(aNumbers);
        return ('000000' + aNumbers[0]).slice(-6); // convertir numeros en un string con tantos ceros por delante como queramos
    }
    id: string;
    constructor(public name: string, public url: string) {
        this.id = Pokemon.generateId();
    }
}
