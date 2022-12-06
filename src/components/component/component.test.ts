import { AbstractComponent } from './component';

describe('Given a class that extends abstract class Component', () => {
    describe('when is exactly the same as the parent class', () => {
        class Test extends AbstractComponent {}
        test('Then public render method should not return value', () => {
            const testComponent = new Test();
            expect(testComponent.testRender()).toBeFalsy();
        });
    });
    describe('when is exactly the same as the parent class', () => {
        class Test extends AbstractComponent {
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
