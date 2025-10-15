const jsdom = require('jsdom');
const { JSDOM } = jsdom;

import { CookieApi } from '../u4/u4e1.js';

describe('Cookies', () => {

    let dom;
    let cookies;
    let window;
    let document;
    let app;

    beforeAll(async () => {
        const options = {
            runScripts: 'dangerously',
            resources: 'usable',
        };

        dom = await JSDOM.fromFile('./u4/index.html', options);

        window = dom.window;
        document = window.document;
        app = document.querySelector('#app');

        Object.assign(document, {
            cookies: { ...global.mockCookies },
        });

        await new Promise((resolve) => {
            window.addEventListener('load', resolve);
            cookies = new CookieApi(document.cookies);
        });
    });


    test('setCookie...', () => {
        cookies.setCookie('simple', '123', 1);

        let testCookie = cookies.getCookie('simple');
        expect(testCookie).toMatch('123');
    });

    test('getCookie...', () => {
        const noCookie = cookies.getCookie('noExists');
        expect(noCookie).toBeNull();

        const cookieValue = cookies.getCookie('simple');
        expect(cookieValue).toBe('123');
    });

    test('removeCookie', () => {
        cookies.removeCookie('simple');
        const cookieValue = cookies.getCookie('simple');
        expect(cookieValue).toBe('');
    });
  });