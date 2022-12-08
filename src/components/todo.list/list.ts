import { Pokemon } from '../../models/pokemon.js';
import { Repo } from '../../repository/repo.js';
import { AbstractComponent } from '../component/component.js';
import { Item } from '../todo.item/item.js';
export class List extends AbstractComponent {
    pokemons: Array<Pokemon>;
    repo = new Repo();
    counter: number;
    constructor(private selector: string, url: string) {
        super();
        this.pokemons = [];
        this.counter = 0;
        this.manageComponent();
        this.loadPokemons(url);
    }

    manageComponent() {
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

    async loadPokemons(url: string) {
        const jSON = await this.repo.load(url);
        if (url === 'http://localhost:3000/pokemons') {
            this.pokemons = jSON;
            !this.counter
                ? (this.counter = this.pokemons.length)
                : this.counter;
            this.pokemons.forEach((item) => {
                new Item('ul.slot-items', item);
            });
            return;
        }
        this.pokemons = jSON.results;
        !this.counter ? (this.counter = this.pokemons.length) : this.counter;
        this.pokemons.forEach((item) => {
            fetch(item.url)
                .then((response) => response.json())
                .then((result) => {
                    new Item('ul.slot-items', result);
                });
        });
        const btnNext = jSON.next
            ? `<button class="next" data-url=${jSON.next}>⏩</button>`
            : '';
        const btnPrevious = jSON.previous
            ? `<button class="previous" data-url=${jSON.previous}>⏪</button>`
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
        ).innerText = ` ${this.counter}/${jSON.count} Pokemons `;
        this.manageComponent();
        return jSON;
    }

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
