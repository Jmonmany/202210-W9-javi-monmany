import { Task } from '../../models/pokemon.js';
import { AbstractComponent } from '../component/component.js';

type DataFormType = {
    title: string;
    responsible: string;
};

export class Add extends AbstractComponent {
    constructor(
        private selector: string,
        public handleAdd: (task: Task) => void
    ) {
        super();
        this.template = this.createTemplate();
        this.render();
    }

    render() {
        const element = super.innRender(this.selector, 'end');
        element
            .querySelector('form.add-task')
            ?.addEventListener('submit', this.handleForm.bind(this));
        return element;
    }

    handleForm(event: Event) {
        const dataForm: DataFormType = {
            title: '',
            responsible: '',
        };

        event.preventDefault();
        const formElement = event.target as HTMLFormElement;
        const inputs = [
            ...formElement.querySelectorAll('[type="text"]'),
            ...formElement.querySelectorAll('[type="number"]'),
            ...formElement.querySelectorAll('select'),
        ];
        [dataForm.title, dataForm.responsible] = [...inputs].map(
            (item) => (item as HTMLFormElement).value
        );
        const newTask = new Task(dataForm.title, dataForm.responsible);
        this.handleAdd({ ...newTask });
    }

    private createTemplate() {
        return `
        <section>
            <h3>Añadir tarea</h3>
            <form class="add-task">
                <div>
                    <label for="title">Tarea</label>
                    <input type="text" name="title" id="title" placeholder="Describe la tarea" required>
                </div>
                <div>
                    <label for="responsible">Responsable</label>
                    <input type="text" name="responsible" id="responsible" placeholder="Responsable de la tarea">
                </div>
                <div>
                    <button type='submit'>Añadir</button>
                </div>
            </form>
        </section>
        `;
    }
}
