import { AbstractComponent } from '../../components/component/component.js';

export class DetailsPage extends AbstractComponent {
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
            <h2>Details</h2>
            <slot name="details"></slot>
        </main>
        `;
    }
}
