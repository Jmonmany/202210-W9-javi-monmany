import { AbstractComponent } from '../../components/component/component.js';
import { List } from '../../components/todo.list/list.js';
export class PokePage extends AbstractComponent {
    url = 'http://localhost:3000/pokemons';
    constructor(private selector: string) {
        super();
        this.template = this.createTemplate();
        this.render();
        this.manageComponent();
    }

    render() {
        return super.innRender(this.selector);
    }

    manageComponent() {
        new List('slot', this.url);
    }

    private createTemplate() {
        return `
        <main>
            <h2>My Pokedex</h2>
            <slot name="pokedex"></slot>
        </main>
        `;
    }
}
