const jsdom = require('jsdom');
const { JSDOM } = jsdom;

import { ClipboardApi } from '../u5/u5e1.js';

describe('Portapapeles', () => {
    const codeText = 'Modified from code text!';

    let dom;
    let window;
    let navigator;
    let clipboard;
    let document;
    let app;

    beforeAll(async () => {
        const options = {
            runScripts: 'dangerously',
            resources: 'usable',
        };

        dom = await JSDOM.fromFile('./u5/index.html', options);

        window = dom.window;
        navigator = window.Navigator;
        document = window.document;
        app = document.querySelector('#app');

        Object.assign(navigator, {
            clipboard: { ...global.mockClipboard },
        });

        jest.spyOn(navigator.clipboard, 'writeText');
        jest.spyOn(navigator.clipboard, 'readText');

        await new Promise((resolve) => {
            window.addEventListener('load', resolve);
            clipboard = new ClipboardApi(navigator.clipboard);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
      });

    test('Copiar primer texto al portapapeles', async () => {
        const copiedText = document.querySelector('.js-copy-from').textContent;
        const result = await clipboard.copy(copiedText, navigator);
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(copiedText);
        expect(result).toBe(true);
    });

    test('Leer primer texto del portapapeles', async () => {
        const clipboardContent = await clipboard.read(navigator);
        expect(navigator.clipboard.readText).toHaveBeenCalledTimes(1);
        expect(clipboardContent).toBe(document.querySelector('.js-copy-from').textContent);
    });

    test('Copiar segundo texto al portapapeles', async () => {
        document.querySelector('.js-copy-from').textContent = codeText;
        const copiedText = document.querySelector('.js-copy-from').textContent;

        const result = await clipboard.copy(copiedText);
        expect(result).toBe(true);
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(codeText);
    });

    test('Leer segundo texto del portapapeles', async () => {
        const clipboardContent = await clipboard.read(navigator);
        expect(navigator.clipboard.readText).toHaveBeenCalledTimes(1);
        expect(clipboardContent).toBe(codeText);
    });
});
