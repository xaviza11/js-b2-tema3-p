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

        const dom = await JSDOM.fromFile('./u1/u1e2.html', options);

        window = dom.window;
        document = window.document;
        app = document.querySelector('#app');
    });

    test('Before DOM Loaded...', () => {
        expect(app).not.toBe(null);
        expect(app.querySelector('.js-project-list')).not.toBe(null);
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

    test('Project generation', () => {

        let value = app.querySelectorAll('.js-project').length;
        expect(value).toBe(6);

        value = app.querySelectorAll('.js-project.archived').length;
        expect(value).toBe(2);

        value = app.querySelectorAll('.js-project.completed').length;
        expect(value).toBe(3);

        value = 0;
        app.querySelectorAll('.js-category').forEach((c) => {
            if (c.textContent === 'development') {
                value++;
            }
        });
        expect(value).toBe(3);

    });

    test('Search data generation...', () => {

        let value = app.querySelectorAll('.js-project[data-search*="wordA"]').length;
        expect(value).toBe(5);

    });

    test('Tags node generation...', () => {

        let value = app.querySelectorAll('.js-project[data-id="5"] .js-tag').length;
        expect(value).toBe(3);

        value = app.querySelector('.js-project[data-id="5"]').dataset.tags;
        expect(value).toBe('tag1,tag2,tag3');

        value = 0;
        app.querySelectorAll('.js-category').forEach((c) => {
            if (c.textContent === 'development') {
                value++;
            }
        });
        expect(value).toBe(3);

    });
});
