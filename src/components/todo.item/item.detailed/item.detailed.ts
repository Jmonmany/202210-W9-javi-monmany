import { Pokemon } from '../../../models/pokemon.js';
import { AbstractComponent } from '../../component/component.js';

export class ItemDetailed extends AbstractComponent {
    constructor(
        private selector: string,
        private item: Pokemon // private updatePokemon: (id: string, data: Partial<Pokemon>) => void, // private deletePokemon: (id: string) => void
    ) {
        super();
        this.template = this.createTemplate(this.item);
        this.render();
    }

    render() {
        const element = super.outRender(this.selector);
        console.log(this.item);
        return element;
    }

    private createTemplate(item: Pokemon) {
        return `
        <ul class="item-detailed"> 
            <li class="pokemon">
                <h4 class="pokemon__title" title="Click for details">${item.name}</h4>
                <img
                  class="pokemon__poster"
                  src=${item.sprites.other.dream_world.front_default}
                  alt = ${item.name}
                />
            </li>
            <li class="detail"><span>height: ${item.height} dm</span></li>
            <li class="detail"><span>weight: ${item.weight} hg</span></li>
            <li class="detail"><span>type: ${item.types[0].type.name}</span></li>
            <li>
                <button class="add-btn detailed" title = "Add to My Pokedex">➕</button>
            </li>
        </ul>
        `;
    }
}
