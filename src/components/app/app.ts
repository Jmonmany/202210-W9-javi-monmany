import { DetailsPage } from '../../pages/details/details.js';
import { HomePage } from '../../pages/home/home.js';
import { PokePage } from '../../pages/pokedex/pokedex.js';
import { consoleDebug } from '../../tools/debug.js';
import { RouterTypes } from '../../types/router.js';
import { Footer } from '../footer/footer.js';
import { Header } from '../header/header.js';
import { Menu } from '../menu/menu.js';

export class App {
    menuOptions: RouterTypes;
    constructor() {
        this.menuOptions = [
            { path: './index.html', label: 'Home' },
            // { path: './details.html', label: 'Pokemon Details' },
            { path: './pokedex.html', label: 'My Pokedex' },
        ];
        try {
            new Header('.root');
            new Menu('header', this.menuOptions);
            this.router();
            new Footer('.root');
        } catch (error) {
            consoleDebug((error as Error).message);
        }
    }

    router() {
        const path = './' + location.pathname.split('/').at(-1);
        switch (path) {
            case this.menuOptions[0].path:
                return new HomePage('.root');
            case this.menuOptions[1].path:
                return new DetailsPage('.root');
            case this.menuOptions[2].path:
                return new PokePage('.root');
            default:
                throw new Error('Path no disponible');
        }
    }
}
