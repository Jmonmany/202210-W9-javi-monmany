import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { Footer } from './footer';

describe('Given "Footer" component', () => {
    document.body.innerHTML = `<slot></slot>`;
    const footer = new Footer('slot');
    const elements = [
        screen.getByRole('contentinfo'), //<footer />
    ];
    test('Then we should to be able to instantiate it', () => {
        expect(footer).toBeInstanceOf(Footer);
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
