"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = void 0;
var clamp = function (value, lowerBound, upperBound) {
    'worklet';
    return Math.min(Math.max(lowerBound, value), upperBound);
};
exports.clamp = clamp;