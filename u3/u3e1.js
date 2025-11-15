// T3. JavaScript profesional en una aplicación web
// U2. Eventos personalizados (custom events)
// Enunciado disponible en u3e1.md / Enunciat disponible a u3e1.md

// ---------------------------
// Tema 3. Unidad 3: Custom Events
// ---------------------------

// A. Clase Sender
class Sender {
  static TYPE_A = 'A';
  static TYPE_B = 'B';

  #refDom;
  count = 0;

  constructor(ref, type) {
    this.#refDom = ref;
    this.type = type;
  }

  init() {
    this.#refDom.addEventListener('click', (e) => {
      e.preventDefault();
      this.trigger();
    });
  }

  trigger() {
    this.count++;
    const event = new CustomEvent(this.type, {
      detail: { count: this.count },
      bubbles: true,
      cancelable: true
    });
    this.#refDom.dispatchEvent(event);
    this.render();
  }

  render() {
    // Mostrar el tipo completo del evento + contador
    this.#refDom.textContent = `${this.type}: ${this.count}`;
  }
}

// B. Clase Logger
class Logger {
  #refDom;
  #notificationList = [];

  constructor(ref) {
    this.#refDom = ref;
    this.init();
  }

  init() {
    // Bind para poder remover listeners
    this._handleA = this.onNotificationReceived.bind(this);
    this._handleB = this.onNotificationReceived.bind(this);

    document.addEventListener(Sender.TYPE_A, this._handleA);
    document.addEventListener(Sender.TYPE_B, this._handleB);
  }

  onNotificationReceived(event) {
    this.#notificationList.unshift(event); // las más recientes primero
    this.render();
  }

  render() {
    this.#refDom.innerHTML = '';
    this.#notificationList.forEach(ev => {
      const p = document.createElement('p');
      p.textContent = `${ev.type}: ${ev.detail.count}`;
      this.#refDom.appendChild(p);
    });
  }

  destroy() {
    document.removeEventListener(Sender.TYPE_A, this._handleA);
    document.removeEventListener(Sender.TYPE_B, this._handleB);
  }
}

// ---------------------------
// Llamadas
// ---------------------------

const notificationADom = document.querySelector('.js-notification-A');
const notificationBDom = document.querySelector('.js-notification-B');
const loggerDom = document.querySelector('.js-logger');

const nA = new Sender(notificationADom, Sender.TYPE_A);
const nB = new Sender(notificationBDom, Sender.TYPE_B);

nA.init();
nB.init();

const logger = new Logger(loggerDom);

// Simulación de clicks
notificationADom.click();
notificationADom.click();
notificationBDom.click();
notificationBDom.click();
notificationBDom.click();
notificationBDom.click();
notificationADom.click();

// Destruir listeners
logger.destroy();

// Estos últimos clicks no se registran en el logger
notificationADom.click();
notificationBDom.click();

