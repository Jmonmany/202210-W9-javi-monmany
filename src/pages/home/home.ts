import { AbstractComponent } from '../../components/component/component.js';
import { List } from '../../components/todo.list/list.js';

export class HomePage extends AbstractComponent {
    url = 'https://pokeapi.co/api/v2/pokemon/';
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
            <h2>Home</h2>
            <slot name="home"></slot>
        </main>
        `;
    }
}
