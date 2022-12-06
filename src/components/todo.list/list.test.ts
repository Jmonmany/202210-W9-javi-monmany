import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { Pokemon } from '../../models/pokemon';
import { List } from './list';
import * as debug from '../../tools/debug.js';
import { Add } from '../todo.add/add';

describe('Given "List" component', () => {
    describe('When it is instantiated with a valid selector', () => {
        document.body.innerHTML = `
            <slot name="slot1"></slot>
            <slot name="slot2"></slot>`;
        const list = new List('slot[name="slot1"]');
        const elements = [
            screen.getByRole('heading', { name: 'Lista de tareas' }), // <h3>
            screen.getByRole('list'), // <ul />
        ];
        test('Then we should to be able to instantiate it', () => {
            expect(list).toBeInstanceOf(List);
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
    });

    describe('When the child component has a NON valid selector', () => {
        Add.prototype.render = jest.fn().mockImplementation(() => {
            throw new Error('Invalid selector');
        });
        const debugSpy = jest.spyOn(debug, 'consoleDebug');
        const list = new List('slot[name="slot2"]');
        expect(list).toBeInstanceOf(List);
        expect(Add.prototype.render).toBeCalled();
        expect(debugSpy).toBeCalled();
    });

    // describe('When its methods are called', () => {
    //     const mockTask = new Task('test', 'user');
    //     let list: List;
    //     let initialTasks;
    //     beforeEach(() => {
    //         list = new List('slot');
    //         initialTasks = [...list.tasks];
    //     });
    //     test('Then if it is call addTask() the tasks array should be returned with a new item', () => {
    //         list.addTask(mockTask);
    //         expect(list.tasks.length).toBe(initialTasks.length + 1);
    //     });
    //     test('Then if it is call updateTask() the tasks array should be returned with a updated item', () => {
    //         const title = 'Updated title';
    //         list.updateTask(list.tasks[0].id, { title });
    //         expect(list.tasks[0].title).toBe(title);
    //     });
    //     test('Then if ts call deleteTask() the tasks array should be returned without the deleted item', () => {
    //         list.deleteTask(list.tasks[0].id);
    //         expect(list.tasks.length).toBe(initialTasks.length - 1);
    //     });
    // });
});
