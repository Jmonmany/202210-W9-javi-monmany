import { AbstractComponent } from '../../components/component/component.js';

export class PokePage extends AbstractComponent {
    constructor(private selector: string) {
        super();
        this.template = this.createTemplate();
        this.render();
    }

    render() {
        return super.innRender(this.selector);
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
