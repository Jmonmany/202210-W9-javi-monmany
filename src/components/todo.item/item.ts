import { Pokemon } from '../../models/pokemon.js';
import { DetailsPage } from '../../pages/details/details.js';
import { AbstractComponent } from '../component/component.js';
export class Item extends AbstractComponent {
    constructor(
        private selector: string,
        private item: Pokemon // private updatePokemon: (id: string, data: Partial<Pokemon>) => void, // private deletePokemon: (id: string) => void
    ) {
        super();
        this.template = this.createTemplate(this.item);
        this.render();
    }

    render() {
        const element = super.innRender(this.selector);
        element
            .querySelector('h4')
            ?.addEventListener('click', this.handleCheck.bind(this));
        // element
        //     .querySelector('[role="button"]')
        //     ?.addEventListener('click', this.handleButton.bind(this));
        return element;
    }

    handleCheck() {
        new DetailsPage('main', this.item);
        // const result: Partial<Pokemon> = {
        //     id: this.item.id,
        // };
    }

    // handleButton() {
    //     consoleDebug('deleted');
    //     this.deleteTask(this.item.id);
    // }

    private createTemplate(item: Pokemon) {
        return ` 
            <li class="pokemon">
                <h4 class="pokemon__title" title="Click for details">${item.name}</h4>
                <img
                    class="pokemon__poster"
                    src=${item.sprites.front_default}
                    alt = ${item.name}
                />
                <button class="add-btn" title = "Add to My Pokedex">➕</button>
            </li>
        `;

        // `
        // <li class="item-task" id="item_${this.item.id}">
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
