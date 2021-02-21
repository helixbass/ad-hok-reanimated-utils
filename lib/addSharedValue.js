"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSharedValue = void 0;
var ad_hok_1 = require("ad-hok");
var react_native_reanimated_1 = require("react-native-reanimated");
var lodash_1 = require("lodash");
var addSharedValue = function (propName, initialValue) {
    return ad_hok_1.addProps(function (props) {
        var _a;
        return (_a = {},
            _a[propName] = react_native_reanimated_1.useSharedValue(lodash_1.isFunction(initialValue) ? initialValue(props) : initialValue),
            _a);
    });
};
exports.addSharedValue = addSharedValue;
