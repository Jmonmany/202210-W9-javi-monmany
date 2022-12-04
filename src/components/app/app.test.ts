import { AboutPage } from '../../pages/about/about.js';
import { HomePage } from '../../pages/home/home.js';
import { TodoPage } from '../../pages/todo/todo.js';
import { Footer } from '../footer/footer.js';
import { Header } from '../header/header.js';
import { Menu } from '../menu/menu.js';
import { App } from './app.js';
import { consoleDebug } from '../../tools/debug.js';

jest.mock('../header/header.js');
jest.mock('../footer/footer.js');
jest.mock('../menu/menu.js');
jest.mock('../../pages/home/home.js');
jest.mock('../../pages/about/about.js');
jest.mock('../../pages/todo/todo.js');
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
    describe('When location include a pathname "./todo.html"', () => {
        test('Then the component AboutPage, should be instantiated', () => {
            global.window.location.pathname = './todo.html';
            const app = new App();
            expect(app).toBeInstanceOf(App);
            expect(TodoPage).toHaveBeenCalled();
        });
    });
    describe('When location include a pathname "./about.html"', () => {
        test('Then the component AboutPage, should be instantiated', () => {
            global.window.location.pathname = './about.html';
            const app = new App();
            expect(app).toBeInstanceOf(App);
            expect(AboutPage).toHaveBeenCalled();
        });
    });
    describe('When any component cannot be instantiated', () => {
        test('Then the component AboutPage, should be instantiated', () => {
            global.window.location.pathname = './bad_path.html';
            const app = new App();
            expect(app).toBeInstanceOf(App);
            expect(consoleDebug).toHaveBeenCalled();
        });
    });
});
