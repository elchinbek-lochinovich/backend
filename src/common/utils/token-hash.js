"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashToken = hashToken;
var crypto_1 = require("crypto");
function hashToken(token) {
    return (0, crypto_1.createHash)('sha256').update(token).digest('hex');
}
