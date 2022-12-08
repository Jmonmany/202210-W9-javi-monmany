import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { RouterTypes } from '../../types/router.js';
import { Menu } from './menu.js';

const menuOptionsMock: RouterTypes = [
    { label: 'Test option 1', path: '' },
    { label: 'Test option 2', path: '' },
];
describe('Given "Menu" component', () => {
    document.body.innerHTML = `<slot></slot>`;
    const menu = new Menu('slot', menuOptionsMock);
    const elements = [
        screen.getByRole('navigation'), // <nav class="menu"/>
        screen.getByRole('list'), // <ul />
        ...screen.getAllByRole('listitem'), // <li />
        screen.getByRole('link', { name: 'Test option 1' }),
        screen.getByRole('link', { name: 'Test option 2' }),
    ];
    test('Then we should to be able to instantiate it', () => {
        expect(menu).toBeInstanceOf(Menu);
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
describe(`Given "Menu" component, 
    When it is instantiate with a invalid DOM selector`, () => {
    test('No element should be render and an error should be throw', () => {
        expect(() => {
            const result = new Menu('.invalid', menuOptionsMock);
            result.render();
        }).toThrowError('Invalid selector');
    });
});
