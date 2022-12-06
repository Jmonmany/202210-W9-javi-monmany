type PokemonType = {
    id: string;
    name: string;
    url: string;
    height: string;
    weight: string;
    types: [
        {
            type: {
                name: string;
            };
        }
    ];
    sprites: {
        front_default: string;
        other: {
            dream_world: {
                front_default: string;
            };
        };
    };
};
export class Pokemon implements PokemonType {
    static generateId() {
        const aNumbers = new Uint32Array(1);
        crypto.getRandomValues(aNumbers);
        return ('000000' + aNumbers[0]).slice(-6); // convertir numeros en un string con tantos ceros por delante como queramos
    }
    id: string;
    constructor(
        public name: string,
        public url: string,
        public height: string,
        public weight: string,
        public types: [
            {
                type: {
                    name: string;
                };
            }
        ],
        public sprites: {
            front_default: string;
            other: {
                dream_world: {
                    front_default: string;
                };
            };
        }
    ) {
        this.id = Pokemon.generateId();
    }
}
