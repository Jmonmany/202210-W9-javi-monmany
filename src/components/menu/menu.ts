import { RouterTypes } from '../../types/router.js';
import { AbstractComponent } from '../component/component.js';

export class Menu extends AbstractComponent {
    constructor(
        private selector: string,
        private menuOptions: RouterTypes
    ) {
        super();
        this.template = this.createTemplate();
        this.render();
    }

    render() {
        return super.innRender(this.selector);
    }

    private createTemplate() {
        const options = this.menuOptions
            .map((item) => `<li><a href="${item.path}">${item.label}</a></li>`)
            .reduce((a, b) => a + b);

        return `
        <nav class="menu">
            <ul>
                ${options}
            </ul>
        </nav>
        `;
    }
}
