"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
function generate(length) {
    var chars = 'qwertyuiopasdfghjklzxcvbnm';
    var generation = '';
    for (var i = 0; i < length; i++) {
        generation += chars[Math.floor(Math.random() * chars.length)];
    }
    return generation;
}
exports.generate = generate;
