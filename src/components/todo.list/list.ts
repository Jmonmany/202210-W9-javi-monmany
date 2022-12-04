import { Pokemon } from '../../models/pokemon.js';
import { Repo } from '../../repository/repo.js';
import { consoleDebug } from '../../tools/debug.js';
import { AbstractComponent } from '../component/component.js';
import { Item } from '../todo.item/item.js';

export class List extends AbstractComponent {
    pokemons: Array<Pokemon>;
    repo = new Repo();
    constructor(private selector: string) {
        super();
        this.pokemons = []; // array vacío para que no de error todo lo demás
        this.manageComponent();
        this.loadPokemons();
    }

    manageComponent() {
        consoleDebug(this.pokemons);
        this.template = this.createTemplate();
        this.render();
    }

    render() {
        super.cleanHtml(this.selector);
        return super.innRender(this.selector);
    }

    async managePokemons() {
        this.pokemons = await this.repo.load();
        this.manageComponent();
    }

    async loadPokemons() {
        this.pokemons = await this.repo.load();
        this.pokemons.forEach((item) => 
            fetch(item.url)
            .then((response) => response.json())
            .then((result) => {
                const img = result.sprites.front_default
                item.url = img
                new Item('ul.slot-items', item)
            })
        )
        this.manageComponent();
    }

    async addpokemon(pokemon: Partial<Pokemon>) {
        const finalpokemon: Pokemon = await this.repo.create(pokemon);
        this.pokemons = [...this.pokemons, finalpokemon];
        this.manageComponent();
        return this.pokemons;
    }
    async updatePokemon(id: string, data: Partial<Pokemon>) {
        data.id = id;
        const finalpokemon: Pokemon = await this.repo.update(data);
        this.pokemons = this.pokemons.map((item) =>
            item.id === id ? finalpokemon : item
        );
        this.manageComponent();
        return this.pokemons;
    }
    async deletePokemon(id: string) {
        const finalId = await this.repo.delete(id);
        this.pokemons = this.pokemons.filter((item) => item.id !== finalId);
        this.manageComponent();
        return finalId;
    }

    private createTemplate() {
        return `
        <section class="pokemons">
            <h3>Lista de Pokemon</h3>
            <ul class="slot-items"></ul>
        </section>
        `;
    }
}
