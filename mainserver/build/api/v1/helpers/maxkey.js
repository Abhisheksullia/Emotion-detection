"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findMaxKey(obj) {
    var maxKey = null;
    var maxValue = -Infinity;
    for (var key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] > maxValue) {
            maxValue = obj[key];
            maxKey = key;
        }
    }
    return maxKey;
}
exports.default = findMaxKey;
