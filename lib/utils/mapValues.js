"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapValues = void 0;
var mapValues = function (callback, obj) {
    var ret = {};
    for (var key in obj) {
        var value = obj[key];
        ret[key] = callback(value, key);
    }
    return ret;
};
exports.mapValues = mapValues;
