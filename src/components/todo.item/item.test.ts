import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Task } from '../../models/pokemon';
import { Item } from './item';

describe('Given "Item" component', () => {
    document.body.innerHTML = `<slot></slot>`;
    const updateTask = jest.fn();
    const deleteTask = jest.fn();
    const mockTitle = 'Test task';
    const mockUser = 'Test user';
    const newTask = new Task(mockTitle, mockUser);
    newTask.isCompleted = true;
    const itemTask = new Item('slot', newTask, updateTask, deleteTask);
    const elements = [
        screen.getByRole('listitem'), // <li />
        screen.getByRole('checkbox'),
        ...screen.getAllByRole('status'), // 2 * <output>
        screen.getByRole('button'),
    ];
    test('Then we should to be able to instantiate it', () => {
        expect(itemTask).toBeInstanceOf(Item);
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
    describe('When data are provided in the component', () => {
        test('Then user could interact with them ', async () => {
            const user = userEvent.setup();
            expect(elements[2]).toHaveValue(mockTitle);
            expect(elements[3]).toHaveValue(mockUser);
            await user.click(elements[1]);
            expect(updateTask).toHaveBeenCalledTimes(1);
            await user.click(elements[4]);
            expect(deleteTask).toHaveBeenCalledTimes(1);
        });
    });
});
