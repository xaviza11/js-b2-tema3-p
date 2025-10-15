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
            // pretendToBeVisual: true,
        };

        const dom = await JSDOM.fromFile('./u2/index.html', options);
        // console.log(dom.serialize());

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

    test('TodoApp todos manipulation...', () => {

        let value = document.querySelectorAll('.js-todo').length;
        expect(value).toBe(4);

        value = document.querySelector('.js-todo[data-todo="Test"]');
        expect(value).not.toBe(null);

        value = document.querySelector('.js-todo[data-todo="Call mom"]');
        expect(value).toBe(null);

        value = document.querySelector('.js-todo[data-todo="Another one"]');
        expect(value).toBe(null);

    });

    test('TodoApp todos properties...', () => {

        let value = Boolean(document.querySelector('.js-todo[data-todo="Shopping"]').dataset.done);
        expect(value).toBe(true);

        value = Boolean(document.querySelector('.js-todo[data-todo="New one"]').dataset.done);
        expect(value).toBe(true);

        value = document.querySelector('.js-todo[data-todo="New one"] .js-todo-done');
        expect(value.textContent).toContain('done');

        value = document.querySelector('.js-todo[data-todo="Test"] .js-todo-done');
        expect(value.textContent).toContain('pending');

    });

});
