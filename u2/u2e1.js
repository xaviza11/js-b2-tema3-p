// T3. JavaScript profesional en una aplicación web
// U2. Delegación de eventos
// Enunciado disponible en u2e1.md / Enunciat disponible a u2e1.md

// Ejemplo de TASK_LIST disponible
const TASK_LIST = [
    { name: 'Shopping', done: false },
    { name: 'Call mom', done: true },
    { name: 'Read book', done: false },
    { name: 'Test', done: false }
];

// --- Clase TodoList ---
class TodoList {
    #appRef;
    #listRef;
    #todoTpl;

    constructor(appRef, listRef, todoTpl) {
        this.#appRef = appRef;
        this.#listRef = listRef;
        this.#todoTpl = todoTpl;
        this.list = [];

        this.init();
    }

    init() {
        // Click en "Add"
        const addBtn = this.#appRef.querySelector('.js-todo-add');
        const inputField = this.#appRef.querySelector('.js-todo-new-name');

        addBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const todoName = inputField.value.trim();
            if (this.add(todoName, false)) {
                inputField.value = '';
                this.render();
            }
        });

        // Delegación de eventos para done / delete
        this.#listRef.addEventListener('click', (e) => {
            const target = e.target;
            const todoLi = target.closest('.js-todo');
            if (!todoLi) return;

            const todoName = todoLi.dataset.todo;

            if (target.classList.contains('js-todo-done')) {
                e.preventDefault();
                this.toggle(todoName);
                this.render();
            }

            if (target.classList.contains('js-todo-delete')) {
                e.preventDefault();
                this.remove(todoName);
                this.render();
            }
        });
    }

    add(todo, status) {
        if (!todo || this.list.some(t => t.name === todo)) return false;
        this.list.push({ name: todo, done: status });
        return true;
    }

    remove(todoName) {
        this.list = this.list.filter(t => t.name !== todoName);
    }

    toggle(todoName) {
        const todo = this.list.find(t => t.name === todoName);
        if (todo) todo.done = !todo.done;
    }

    render() {
        this.#listRef.innerHTML = '';
        const fragment = document.createDocumentFragment();

        this.list.forEach(todo => {
            const todoNode = this.#todoTpl.content.cloneNode(true);
            const li = todoNode.querySelector('.js-todo');

            li.dataset.todo = todo.name;
            li.dataset.done = todo.done ? 'true' : 'false';

            li.querySelector('.js-todo-name').textContent = todo.name;
            const doneLink = li.querySelector('.js-todo-done');
            doneLink.textContent = todo.done ? 'done' : 'pending';

            fragment.appendChild(todoNode);
        });

        this.#listRef.appendChild(fragment);
    }
}

// --- Instanciación ---
const appNode = document.getElementById('app');
const listNode = appNode.querySelector('.js-todo-list');
const todoTpl = document.getElementById('todo-tpl');

const todosApp = new TodoList(appNode, listNode, todoTpl);

// --- Generación inicial de tareas ---
TASK_LIST.forEach(t => todosApp.add(t.name, t.done));
todosApp.render();

// --- Llamadas adicionales ---
todosApp.add('New one', false);
todosApp.toggle('Shopping');
todosApp.remove('Call mom');
todosApp.add('Another one', true);

document.querySelector('.js-todo-new-name').value = 'Test';
document.querySelector('.js-todo-add').click();

document.querySelector('.js-todo[data-todo="New one"] .js-todo-done').click();
document.querySelector('.js-todo[data-todo="Another one"] .js-todo-delete').click();

//Escribe aquí tu solución / escriviu aquí la vostra solució:
