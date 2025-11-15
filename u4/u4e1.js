
// T3. JavaScript profesional en una aplicación web
// U4. Almacenamiento local (Cookies)
// Enunciado disponible en u4e1.md / Enunciat disponible a u4e1.md
// u4e1.js
export class CookieApi {
    // Propiedad estática: días de expiración por defecto
    static EXPIRING_DAYS = 365;

    // Constructor
    constructor(doc = window.document) {
        this.document = doc;
    }

    // Método estático para calcular la fecha de expiración
    static expirationDate(nDays = CookieApi.EXPIRING_DAYS) {
        const date = new Date();
        date.setTime(date.getTime() + nDays * 24 * 60 * 60 * 1000);
        return date.toUTCString();
    }

    // Método para crear/guardar cookies
    setCookie(key, value, nDays = CookieApi.EXPIRING_DAYS) {
        const cookieValue = JSON.stringify(value);
        const expires = CookieApi.expirationDate(nDays);
        this.document.cookie = `${key}=${cookieValue}; expires=${expires}; path=/`;
    }

    // Método para obtener cookies
    getCookie(key) {
        const cookies = this.document.cookie.split(';').map(c => c.trim());
        for (const cookie of cookies) {
            const [cookieKey, cookieValue] = cookie.split('=');
            if (cookieKey === key) {
                try {
                    return JSON.parse(cookieValue);
                } catch (e) {
                    return null; // En caso de valor no JSON
                }
            }
        }
        return null;
    }

    // Método para eliminar cookies
    removeCookie(key) {
        // Para borrar, establecemos un valor vacío y fecha pasada
        this.document.cookie = `${key}=""; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    }
}

//Escribe aquí tu solución / escriviu aquí la vostra solució:
