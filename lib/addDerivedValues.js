"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDerivedValues = void 0;
var ad_hok_1 = require("ad-hok");
var react_native_reanimated_1 = require("react-native-reanimated");
var mapValues_1 = require("./utils/mapValues");
var addDerivedValues = function (getValues) {
    return ad_hok_1.addProps(function (props) {
        return mapValues_1.mapValues(function (getter) { return react_native_reanimated_1.useDerivedValue(getter); }, getValues(props));
    });
};
exports.addDerivedValues = addDerivedValues;
