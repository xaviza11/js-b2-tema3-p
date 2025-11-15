// T3. JavaScript profesional en una aplicación web
// U1. Trabajo avanzado con el DOM
// Enunciado disponible en u1e2.md / Enunciat disponible a u1e2.md

// --- Función renderProjects ---
function renderProjects(PROJECT_LIST, CATEGORY_LIST) {
  const projectListContainer = document.querySelector('.js-project-list');
  if (!projectListContainer) return;

  // Limpiamos la lista existente
  projectListContainer.innerHTML = '';

  const fragment = document.createDocumentFragment();

  const tplProject = document.getElementById('tpl-project');
  const tplTag = document.getElementById('tpl-tag');

  PROJECT_LIST.forEach(project => {
    // Clonamos template del proyecto
    const projectNode = tplProject.content.cloneNode(true);
    const divProject = projectNode.querySelector('.js-project');

    // Atributos data
    divProject.dataset.id = project.id;
    divProject.dataset.tags = project.tags.join(',');
    divProject.dataset.search = project.search.join(',');
    divProject.dataset.archived = project.archived ? 'true' : 'false';

    // Nombre y progreso
    divProject.querySelector('.js-name').textContent = project.name;
    divProject.querySelector('.js-progress').textContent = project.progress;
    divProject.querySelector('.js-excerpt').innerHTML = project.excerpt;

    // Categoría
    const category = CATEGORY_LIST.find(c => c.id === project.categoryId);
    divProject.querySelector('.js-category').textContent = category ? category.name : '';

    // Tags
    const tagsContainer = divProject.querySelector('.js-tags');
    project.tags.forEach(tag => {
      const tagNode = tplTag.content.cloneNode(true);
      const aTag = tagNode.querySelector('.js-tag-link');
      aTag.dataset.tag = tag;
      aTag.textContent = tag;
      tagsContainer.appendChild(tagNode);
    });

    // Clases visuales
    if (project.archived) divProject.classList.add('archived');
    if (project.progress === 100) divProject.classList.add('completed');

    fragment.appendChild(projectNode);
  });

  projectListContainer.appendChild(fragment);
}

// --- Llamada inicial ---
document.addEventListener('DOMContentLoaded', () => {
  // Supongamos que estos arrays están definidos globalmente en u1e2.js o inline
  renderProjects(PROJECT_LIST, CATEGORY_LIST);
});


const CATEGORY_LIST = [
    {
        id: 1,
        name: 'design'
    }, {
        id: 2,
        name: 'development'
    }, {
        id: 3,
        name: 'consultancy'
    }
];

const PROJECT_LIST = [
    {
        id: 1,
        name: 'First Project',
        excerpt: 'Lorem <strong>ipsum</strong> dolor quan aemet...',
        categoryId: 2,
        progress: 90,
        archived: false,
        search: ['wordA', 'wordB', 'wordC'],
        tags: ['tag1', 'tag2']
    }, {
        id: 2,
        name: 'Second Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 2,
        progress: 50,
        archived: false,
        search: ['wordA', 'wordD'],
        tags: ['tag3']
    }, {
        id: 3,
        name: 'Third Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 1,
        progress: 20,
        archived: false,
        search: ['wordB', 'wordC'],
        tags: ['tag1', 'tag3']
    }, {
        id: 4,
        name: 'Fourth Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 3,
        progress: 100,
        archived: true,
        search: ['wordA', 'wordB'],
        tags: ['tag2']
    }, {
        id: 5,
        name: 'Fifth Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 3,
        progress: 100,
        archived: false,
        search: ['wordA', 'wordC', 'wordD'],
        tags: ['tag1', 'tag2', 'tag3']
    }, {
        id: 6,
        name: 'Sixth Project',
        excerpt: 'Lorem ipsum <strong>dolor quan</strong> aemet...',
        categoryId: 2,
        progress: 100,
        archived: true,
        search: ['wordA', 'wordB', 'wordD'],
        tags: ['tag1']
    },
];

//Escribe aquí tu solución / escriviu aquí la vostra solució:
