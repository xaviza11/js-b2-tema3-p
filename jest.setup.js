// jest.setup.js

global.mockCookies = {
    cookies: '',

    get cookie() {
        return this.cookies;
    },

    set cookie(cookieValue) {
        const cookies = this.cookies.split(' ');
        const cookieName = cookieValue.split('=').shift();
        const cookieNameLength = cookieName.length;
        let cookieIndex = -1;

        cookies.forEach((value, index) => {
            if (`${value.substr(0, cookieNameLength)}=` === `${cookieName}=`) {
                cookieIndex = index;
            }
        });

        if (cookieIndex > -1) {
            cookies[cookieIndex] = `${cookieValue};`;
        } else {
            cookies.push(`${cookieValue};`);
        }

        this.cookies = cookies.join(' ').trim();
    },
};

global.mockClipboard = {
    clipboardText: null,

    writeText: async function (text) {
        this.clipboardText = text;
        return Promise.resolve(true);
    },
    readText: async function () {
        return Promise.resolve(this.clipboardText || null);
    },
};
