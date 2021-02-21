"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSharedValues = void 0;
var ad_hok_1 = require("ad-hok");
var react_native_reanimated_1 = require("react-native-reanimated");
var isFunction_1 = require("./utils/isFunction");
var mapValues_1 = require("./utils/mapValues");
var addSharedValues = function (initialValues) {
    return ad_hok_1.addProps(function (props) {
        return mapValues_1.mapValues(function (value) { return react_native_reanimated_1.useSharedValue(value); }, isFunction_1.isFunction(initialValues) ? initialValues(props) : initialValues);
    });
};
exports.addSharedValues = addSharedValues;
