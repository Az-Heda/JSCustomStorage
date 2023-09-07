const myStorageDefaultExpr = 1000 * 60 * 60 * 24;
const myStorage = {
    add: function(key, value) {
        if (typeof Storage !== undefined) {
            window.localStorage.setItem(key, JSON.stringify(value));
            return Object.keys(window.localStorage).includes(key);
        }
        return null;
    },
    remove: function(key) {
        if (typeof Storage !== undefined) {
            if (Object.keys(window.localStorage).includes(key)) {
                window.localStorage.removeItem(key);
                return true;
            }
            return false;
        }
        return null;
    },
    get: function(key) {
        if (typeof Storage !== undefined) {
            if (Object.keys(window.localStorage).includes(key)) {
                return JSON.parse(window.localStorage.getItem(key));
            }
        }
        return null;
    },
    clear: function() {
        if (typeof Storage !== undefined) {
            window.localStorage.clear();
            return window.localStorage.length == 0;
        }
        return null;
    },
    localcookie: {
        set: function(key, value, expr = myStorageDefaultExpr) {
            const now = new Date();
            const item = { value: value, expiry: now.getTime() + expr };
            window.localStorage.setItem(key, JSON.stringify(item));
        },
        read: function(key) {
            if (Object.keys(window.localStorage).includes(key)) {
                const itemStr = window.localStorage.getItem(key);
                if (!itemStr) return null;
                const item = JSON.parse(itemStr);
                const now = new Date();
                if (now.getTime() > item.expiry) {
                    window.localStorage.removeItem(key);
                    return null;
                }
                return item.value;
            }
            return null;
        }
    }
}
