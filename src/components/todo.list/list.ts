import { Pokemon } from '../../models/pokemon.js';
import { Repo } from '../../repository/repo.js';
import { consoleDebug } from '../../tools/debug.js';
import { AbstractComponent } from '../component/component.js';
import { Item } from '../todo.item/item.js';

export class List extends AbstractComponent {
    pokemons: Array<Pokemon>;
    repo = new Repo();
    url = 'https://pokeapi.co/api/v2/pokemon/';
    counter: number;
    constructor(private selector: string) {
        super();
        this.pokemons = []; // array vacío para que no de error todo lo demás
        this.counter = 0;
        this.manageComponent();
        this.loadPokemons(this.url);
    }

    manageComponent() {
        consoleDebug(this.pokemons);
        this.template = this.createTemplate();
        this.render();
    }

    render() {
        super.cleanHtml(this.selector);
        const element = super.outRender(this.selector);
        return element;
    }

    handleCounter(eventTarget: HTMLElement) {
        eventTarget.className === 'next'
            ? (this.counter += this.pokemons.length)
            : (this.counter -= this.pokemons.length);
    }

    // async managePokemons() {
    //     this.pokemons = await this.repo.load();
    //     this.manageComponent();
    // }

    // handleButtons(event: Event) {
    //     const value = event.target.dataset.url
    //     this.loadPokemons(value)
    // }

    async loadPokemons(url: string) {
        const jSONArray = await this.repo.load(url);
        this.pokemons = jSONArray[1];
        !this.counter ? (this.counter = this.pokemons.length) : this.counter;
        this.pokemons.forEach((item) => {
            fetch(item.url)
                .then((response) => response.json())
                .then((result) => {
                    new Item('ul.slot-items', result);
                });
        });
        const btnNext = jSONArray[0].next
            ? `<button class="next" data-url=${jSONArray[0].next}>⏩</button>`
            : '';
        const btnPrevious = jSONArray[0].previous
            ? `<button class="previous" data-url=${jSONArray[0].previous}>⏪</button>`
            : '';
        const buttonsDiv = <HTMLElement>document.getElementById('buttons');
        buttonsDiv.innerHTML = `${btnPrevious} ${btnNext}`;

        const buttons = document.querySelectorAll('div button');
        [...buttons].forEach((item) =>
            item.addEventListener('click', (e: Event) => {
                const urlValue = (e.target as HTMLElement).dataset.url;
                this.cleanHtml('ul.slot-items');
                this.loadPokemons(urlValue as string);
                this.handleCounter(e.target as HTMLElement);
            })
        );
        const spanMessage = document.querySelector('span');
        (
            spanMessage as HTMLElement
        ).innerText = ` ${this.counter}/${jSONArray[0].count} Pokemons `;
        this.manageComponent();
    }

    // async addpokemon(pokemon: Partial<Pokemon>) {
    //     const finalpokemon: Pokemon = await this.repo.create(pokemon);
    //     this.pokemons = [...this.pokemons, finalpokemon];
    //     this.manageComponent();
    //     return this.pokemons;
    // }
    // async updatePokemon(id: string, data: Partial<Pokemon>) {
    //     data.id = id;
    //     const finalpokemon: Pokemon = await this.repo.update(data);
    //     this.pokemons = this.pokemons.map((item) =>
    //         item.id === id ? finalpokemon : item
    //     );
    //     this.manageComponent();
    //     return this.pokemons;
    // }
    // async deletePokemon(id: string) {
    //     const finalId = await this.repo.delete(id);
    //     this.pokemons = this.pokemons.filter((item) => item.id !== finalId);
    //     this.manageComponent();
    //     return finalId;
    // }

    private createTemplate() {
        return `
        <section class="pokemons">
            <h3>Lista de Pokemon</h3>
            <ul class="slot-items"></ul>
        </section>
        <div class="buttons" id="buttons"></div>
        <span></span>
        `;
    }
}
