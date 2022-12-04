import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Add } from './add';

describe('Given "Add" component', () => {
    const handleAdd = jest.fn();
    document.body.innerHTML = `<slot></slot>`;
    const add = new Add('slot', handleAdd);
    const elements = [
        screen.getByRole('heading', { name: 'Añadir tarea' }), // <h1>
        ...screen.getAllByRole('textbox'), // <input>
        screen.getByRole('button'),
    ];
    test('Then we should to be able to instantiate it', () => {
        expect(add).toBeInstanceOf(Add);
    });
    describe.each(elements)(
        'When it is call with a DOM implementation',
        (element: HTMLElement) => {
            test(`Then ${element.tagName} should be render`, () => {
                expect(element).toBeInstanceOf(HTMLElement);
                expect(element).toBeInTheDocument();
            });
        }
    );

    describe('When data are provided in the form', () => {
        const mockTitle = 'Test task';
        const mockUser = 'Test user';
        test('Then data form could bee used ', async () => {
            const user = userEvent.setup();
            await user.type(elements[1], mockTitle);
            await user.type(elements[2], mockUser);
            expect(elements[1]).toHaveValue(mockTitle);
            expect(elements[2]).toHaveValue(mockUser);
            await user.click(elements[3]);
            expect(handleAdd).toHaveBeenCalled();
        });
    });
});
