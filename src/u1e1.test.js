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
            pretendToBeVisual: true,
        };

        const dom = await JSDOM.fromFile('./u1/u1e1.html', options);

        window = dom.window;
        document = window.document;
        app = document.querySelector('#app');
    });

    test('Before DOM Loaded...', () => {
        expect(app).not.toBe(null);
        expect(app.querySelector('.js-list')).not.toBe(null);
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

    test('Generated list...', () => {

        let value = app.querySelectorAll('.js-item').length;
        expect(value).toBe(4);

        value = app.querySelector('.js-item[data-id="1"]').textContent;
        expect(value).toBe('First');
        value = app.querySelector('.js-item[data-id="2"]').textContent;
        expect(value).toBe('Second');
        value = app.querySelector('.js-item[data-id="3"]').textContent;
        expect(value).toBe('Third');
        value = app.querySelector('.js-item[data-id="4"]').textContent;
        expect(value).toBe('Fourth');

        value = app.querySelectorAll('.js-item.highlight').length;
        expect(value).toBe(2);

    });

});
