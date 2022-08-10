if (typeof window !== "undefined" && window.crypto != undefined) {
}
else {
    const webcrypto = require("crypto").webcrypto;
    if (typeof window === "undefined") {
        global.window = {};
    }
    window.crypto = {
        subtle: webcrypto.subtle,
        getRandomValues: webcrypto.getRandomValues,
    };
}
//# sourceMappingURL=setupNodePollyfill.js.map