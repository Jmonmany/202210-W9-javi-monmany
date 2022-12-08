import { AbstractComponent } from '../../components/component/component.js';
import { ItemDetailed } from '../../components/todo.item/item.detailed/item.detailed.js';
import { Pokemon } from '../../models/pokemon.js';
export class DetailsPage extends AbstractComponent {
    constructor(private selector: string, private item: Pokemon) {
        super();
        this.template = this.createTemplate();
        this.render();
        this.manageComponent();
    }

    render() {
        return super.outRender(this.selector);
    }

    manageComponent() {
        new ItemDetailed('slot', this.item);
    }

    private createTemplate() {
        return `
        <main>
            <h2>Details</h2>
            <slot name="details"></slot>
        </main>
        `;
    }
}
