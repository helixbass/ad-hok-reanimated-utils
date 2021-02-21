"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAnimatedCallback = void 0;
var react_native_reanimated_1 = require("react-native-reanimated");
var addAnimatedCallback = function (callback) { return function (props) {
    react_native_reanimated_1.useDerivedValue(callback(props));
    return props;
}; };
exports.addAnimatedCallback = addAnimatedCallback;
