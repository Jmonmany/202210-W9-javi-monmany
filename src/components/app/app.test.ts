import { HomePage } from '../../pages/home/home.js';
import { Footer } from '../footer/footer.js';
import { Header } from '../header/header.js';
import { Menu } from '../menu/menu.js';
import { App } from './app.js';
import { consoleDebug } from '../../tools/debug.js';
import { PokePage } from '../../pages/pokedex/pokedex.js';

jest.mock('../header/header.js');
jest.mock('../footer/footer.js');
jest.mock('../menu/menu.js');
jest.mock('../../pages/details/details.js');
jest.mock('../../pages/home/home.js');
jest.mock('../../pages/pokedex/pokedex.js');
jest.mock('../../tools/debug.js');

describe('Given and instantiate "App" class', () => {
    beforeAll(() => {
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
            value: {},
        });
    });
    describe('When location include a pathname "./index.html"', () => {
        test('Then the application components, included HomePage, should be instantiated ', () => {
            global.window.location.pathname = './index.html';
            const app = new App();
            expect(app).toBeInstanceOf(App);
            expect(Header).toHaveBeenCalled();
            expect(Footer).toHaveBeenCalled();
            expect(Menu).toHaveBeenCalled();
            expect(HomePage).toHaveBeenCalled();
        });
    });
    describe('When location include a pathname "./about.html"', () => {
        test('Then the component PokePage, should be instantiated', () => {
            global.window.location.pathname = './pokedex.html';
            const app = new App();
            expect(app).toBeInstanceOf(App);
            expect(PokePage).toHaveBeenCalled();
        });
    });
    describe('When any component cannot be instantiated', () => {
        test('Then the component DetailsPage, should be instantiated', () => {
            global.window.location.pathname = './bad_path.html';
            const app = new App();
            expect(app).toBeInstanceOf(App);
            expect(consoleDebug).toHaveBeenCalled();
        });
    });
});
