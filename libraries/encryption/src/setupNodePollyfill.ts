if (typeof window !== "undefined" && window.crypto != undefined) {
} else {
  const webcrypto = require("crypto").webcrypto;
  if (typeof window === "undefined") {
    (global.window as any) = {};
  }
  window.crypto = webcrypto;
}
