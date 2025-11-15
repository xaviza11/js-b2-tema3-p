// T3. JavaScript profesional en una aplicación web
// U1. Trabajo avanzado con el DOM
// Enunciado disponible en u1e1.md / Enunciat disponible a u1e1.md
// --- A. Función getItems ---
function getItems() {
  const nodes = document.querySelectorAll('.js-item');
  return Array.from(nodes).map(node => ({
    id: node.dataset.id,
    es: node.dataset.es,
    en: node.dataset.en
  }));
}

// --- B. Función emptyList ---
function emptyList() {
  const listNode = document.querySelector('.js-list');
  if (listNode) listNode.innerHTML = '';
}

// --- C. Función renderList ---
function renderList(itemList, lang) {
  emptyList();
  const listNode = document.querySelector('.js-list');
  if (!listNode) return;

  itemList.forEach(item => {
    const li = document.createElement('li');
    li.className = 'js-item';
    li.dataset.id = item.id;
    li.dataset.es = item.es;
    li.dataset.en = item.en;
    li.textContent = lang === 'es' ? item.es : item.en;
    listNode.appendChild(li);
  });
}

// --- D. Función updateItemStyle ---
function updateItemStyle(idItem) {
  const node = document.querySelector(`.js-item[data-id="${idItem}"]`);
  if (node) node.classList.add('highlight');
}

// --- E. Inicialización ---
document.addEventListener('DOMContentLoaded', () => {
  const words = getItems();
  renderList(words, 'en'); // renderizamos la lista en inglés
  updateItemStyle('2'); // resaltamos item con id 2
  updateItemStyle('4'); // resaltamos item con id 4
});

//Escribe aquí tu solución / escriviu aquí la vostra solució:
