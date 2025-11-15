// T3. JavaScript profesional en una aplicación web
// U4. Almacenamiento local (Cookies)
// Enunciado disponible en u5e1.md / Enunciat disponible a u5e1.md
// u5e1.js

export class ClipboardApi {
    constructor(clipboard) {
        // Si se recibe un objeto clipboard, se usa, si no, se usa window.navigator.clipboard
        this.clipboard = clipboard || window.navigator.clipboard;
    }

    // Método para copiar texto al portapapeles
    async copy(text) {
        try {
            await this.clipboard.writeText(text);
            return true; // Opcional, se puede devolver true si se copia correctamente
        } catch (err) {
            console.error('Error copying to clipboard:', err);
            return false;
        }
    }

    // Método para leer texto del portapapeles
    async read() {
        try {
            const text = await this.clipboard.readText();
            return text;
        } catch (err) {
            console.error('Error reading from clipboard:', err);
            return '';
        }
    }
}

//Escribe aquí tu solución / escriviu aquí la vostra solució:
