import { Pokemon } from '../../models/pokemon.js';
import { consoleDebug } from '../../tools/debug.js';
import { AbstractComponent } from '../component/component.js';

export class Item extends AbstractComponent {
    constructor(
        private selector: string,
        private item: Pokemon // private updatePokemon: (id: string, data: Partial<Pokemon>) => void, // private deletePokemon: (id: string) => void
    ) {
        super();
        this.template = this.createTemplate(item);
        this.render();
    }

    render() {
        const element = super.innRender(this.selector);
        // element
        //     .querySelector('[type="checkbox"]')
        //     ?.addEventListener('change', this.handleCheck.bind(this));
        // element
        //     .querySelector('[role="button"]')
        //     ?.addEventListener('click', this.handleButton.bind(this));
        return element;
    }

    // handleCheck() {
    //     const result: Partial<Task> = {
    //         id: this.item.id,
    //         isCompleted: !this.item.isCompleted,
    //     };
    //     consoleDebug('checked: ' + result);
    //     this.updateTask(this.item.id, result);
    // }

    // handleButton() {
    //     consoleDebug('deleted');
    //     this.deleteTask(this.item.id);
    // }

    private createTemplate(item: Pokemon) {
        // const srcImg = fetch(item.url)
        //     .then((response) => response.json())
        //     .then((result) => {
        //         return result.sprites.front_default;
        //     });

        return ` 
                <li class="serie">
                <h4 class="serie__title">${item.name}</h4>
                <img
                  class="serie__poster"
                  src="${item.url}"
                  alt=${item.name}
                />
                <i class="">➕</i>
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
