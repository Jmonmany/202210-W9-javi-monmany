import { App } from './components/app/app.js';
import { consoleDebug } from './tools/debug.js';

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        try {
            new App();
        } catch (error) {
            consoleDebug((error as Error).message);
        }
    });
})();
