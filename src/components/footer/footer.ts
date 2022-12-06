import { AbstractComponent } from '../component/component.js';

export class Footer extends AbstractComponent {
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
        <footer>
            <address>
                ISDI Coders
            </address>
        </footer>
        `;
    }
}
