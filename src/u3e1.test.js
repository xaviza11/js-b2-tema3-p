const jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('DOM Manipulation', () => {
    let window;
    let document;
    let app;

    beforeAll(async () => {
        const options = {
            runScripts: 'dangerously',
            resources: 'usable',
        };

        const dom = await JSDOM.fromFile('./u3/index.html', options);

        window = dom.window;
        document = window.document;
        app = document.querySelector('#app');
    });


    test('Before DOM Loaded...', () => {

        expect(app).not.toBe(null);

    });


    test('DOM Content Loader', (done) => {

        document.addEventListener('DOMContentLoaded', () => {

            try {
                expect(app).not.toBe(null);
                done();
            } catch (error) {
                done(error);
            }

        });

    });

    test('Senders status...', () => {

        let value = document.querySelector('.js-notification-A').textContent;
        expect(value).toBe('A: 4');

        value = document.querySelector('.js-notification-B').textContent;
        expect(value).toBe('B: 6');

    });

    test('Logger display...', () => {

        let value = document.querySelector('.js-logger').textContent;

        expect(value).toContain('EVENT_NOTIFICATION_A: 1');
        expect(value).toContain('EVENT_NOTIFICATION_A: 2');
        expect(value).toContain('EVENT_NOTIFICATION_A: 3');

        expect(value).toContain('EVENT_NOTIFICATION_B: 1');
        expect(value).toContain('EVENT_NOTIFICATION_B: 2');
        expect(value).toContain('EVENT_NOTIFICATION_B: 3');
        expect(value).toContain('EVENT_NOTIFICATION_B: 4');

    });

    test('Listeners cleanup...', () => {

        let value = document.querySelector('.js-notification-A');
        value.dispatchEvent(new window.MouseEvent('click'));
        value.dispatchEvent(new window.MouseEvent('click'));
        expect(value.textContent).toBe('A: 6');

        value = document.querySelector('.js-logger').textContent;
        expect(value).toContain('EVENT_NOTIFICATION_B: 4');
        expect(value).not.toContain('EVENT_NOTIFICATION_A: 4');
        expect(value).not.toContain('EVENT_NOTIFICATION_A: 5');
        expect(value).not.toContain('EVENT_NOTIFICATION_A: 6');

    });

});
