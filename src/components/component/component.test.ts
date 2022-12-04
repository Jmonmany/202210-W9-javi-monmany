import { Component } from './component';

describe('Given a class that extends abstract class Component', () => {
    describe('when is exactly the same as the parent class', () => {
        class Test extends Component {}
        test('Then public render method should not return value', () => {
            const testComponent = new Test();
            expect(testComponent.render()).toBeFalsy();
        });
    });
    describe('when is exactly the same as the parent class', () => {
        class Test extends Component {
            render() {
                return super.innRender('');
            }
        }
        test('Then public render method should throw an error', () => {
            const testComponent = new Test();
            expect(() => {
                testComponent.render();
            }).toThrowError('Invalid selector');
        });
    });
});
