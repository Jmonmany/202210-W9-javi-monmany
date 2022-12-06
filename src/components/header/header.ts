import { AbstractComponent } from '../component/component.js';

export class Header extends AbstractComponent {
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
        <header>
            <ul class="lights">
                <li class="lights_blue"></li>
                <li class="lights_red"></li>
                <li class="lights_yellow"></li>
                <li class="lights_green"></li>
            </ul>
            <h1>
                The PokeScript
            </h1>
        </header>
        `;
    }
}
