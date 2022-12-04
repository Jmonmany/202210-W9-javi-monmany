export abstract class AbstractComponent {
    protected template!: string;
    protected element!: Element;

    testRender() {
        return this.element;
    }

    protected innRender(selector: string, position: 'start' | 'end' = 'end') {
        type validChild = 'firstElementChild' | 'lastElementChild';
        const positions = {
            start: { position: 'afterbegin', child: 'firstElementChild' },
            end: { position: 'beforeend', child: 'lastElementChild' },
        };
        this.element = this.selectElement(selector);
        this.element.insertAdjacentHTML(
            positions[position].position as InsertPosition,
            this.template
        );
        const child = positions[position].child as validChild;
        this.element = this.element[child] as Element;
        return this.element;
    }
    protected render(selector: string) {
        const htmlElement = document.querySelector(selector);
        if (htmlElement === null) return;
        this.element = htmlElement;
        this.element.innerHTML = this.template;
        return this.element;
    }
    protected addRender(selector: string) {
        const htmlElement = document.querySelector(selector);
        if (htmlElement === null) return;
        this.element = htmlElement;
        this.element.innerHTML += this.template;
        return this.element;
    }
    protected outRender(selector: string) {
        const htmlElement = document.querySelector(selector);
        if (htmlElement === null) return;
        this.element = htmlElement;
        this.element.outerHTML = this.template;
        return this.element;
    }
    protected cleanHtml(selector: string) {
        const htmlElement = document.querySelectorAll(selector);
        if (htmlElement === null) return;
        htmlElement.forEach((item) => (item.innerHTML = ''));
        return htmlElement;
    }
    private selectElement(selector: string): Element {
        const error = new Error('Invalid selector');
        if (!selector) throw error;
        const e = document.querySelector(selector);
        if (e === null) throw error;
        return e;
    }
}
