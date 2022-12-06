import { consoleDebug } from './debug';

const log = jest.spyOn(global.console, 'log').mockImplementation(() => {
    //
});

describe('Given "consoleDebug" ', () => {
    describe('When there are no process.env', () => {
        // In the browser
        test('Then "console.log" should be call', () => {
            const info = new Error('test');
            consoleDebug(info);
            expect(log).toHaveBeenCalledWith(info);
        });
    });
    describe('When there are process and NODE_ENV="development"', () => {
        // During THIS testing node is executed with NODE_ENV = development
        let previousEnv: string | undefined;
        beforeEach(() => {
            previousEnv = process.env.NODE_ENV;
        });
        test('Then "console.log" should be call', () => {
            const info = 'test';
            process.env.NODE_ENV = 'development';
            consoleDebug(info);
            expect(log).toHaveBeenCalledWith(info);
        });
        afterEach(() => {
            process.env.NODE_ENV = previousEnv;
        });
    });
    describe('When there are process & env="testing"', () => {
        // During testing node is executed with NODE_ENV = testing
        test('Then "console.log" should not be call', () => {
            const info = 'test';
            consoleDebug(info);
            expect(log).not.toHaveBeenCalledWith();
        });
    });
});
