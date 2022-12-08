import { Pokemon } from '../../models/pokemon.js';
import { DetailsPage } from '../../pages/details/details.js';
import { Repo } from '../../repository/repo.js';
import { AbstractComponent } from '../component/component.js';
export class Item extends AbstractComponent {
    repo = new Repo();
    constructor(
        private selector: string,
        private pokemon: Pokemon // private updatePokemon: (id: string, data: Partial<Pokemon>) => void, // private deletePokemon: (id: string) => void
    ) {
        super();
        this.template = this.createTemplate(this.pokemon);
        this.render();
    }

    render() {
        const element = super.innRender(this.selector);
        element
            .querySelector('h4')
            ?.addEventListener('click', this.handleCheck.bind(this));
        element
            .querySelector('button')
            ?.addEventListener('click', this.handleButton.bind(this));
        return element;
    }

    handleCheck() {
        new DetailsPage('main', this.pokemon);
    }

    async handleButton() {
        const finalpokemon: Pokemon = await this.repo.create(
            'http://localhost:3000/pokemons',
            {
                name: this.pokemon.name,
                height: this.pokemon.height,
                weight: this.pokemon.weight,
                types: [
                    {
                        type: {
                            name: this.pokemon.types[0].type.name,
                        },
                    },
                ],
                sprites: {
                    front_default: this.pokemon.sprites.front_default,
                    other: {
                        dream_world: {
                            front_default:
                                this.pokemon.sprites.other.dream_world
                                    .front_default,
                        },
                    },
                },
            }
        );
        return finalpokemon;
    }

    private createTemplate(pokemon: Pokemon) {
        return ` 
            <li class="pokemon">
                <h4 class="pokemon__title" title="Click for details">${pokemon.name}</h4>
                <img
                    class="pokemon__poster"
                    src=${pokemon.sprites.front_default}
                    alt = ${pokemon.name}
                />
                <button class="add-btn" title = "Add to My Pokedex">➕</button>
            </li>
        `;

        // `
        // <li class="pokemon-task" id="item_${this.item.id}">
        //     <span class="item-task__start">
        //         <input type="checkbox" ${this.item.isCompleted && 'checked'}>
        //         <span>${this.item.id}</span>
        //     </span>
        //     <span class="item-task__middle">
        //         <output>${this.item.title}</output>
        //         <output>${this.item.responsible}</output>
        //     </span>
        //     <span role="button" class="item-task__end button">
        //         ➕
        //     </span>
        // </li>
        // `;
    }
}
