"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDerivedValue = void 0;
var ad_hok_1 = require("ad-hok");
var react_native_reanimated_1 = require("react-native-reanimated");
var addDerivedValue = function (propName, getValue) {
    return ad_hok_1.addProps(function (props) {
        var _a;
        return (_a = {},
            _a[propName] = react_native_reanimated_1.useDerivedValue(getValue(props)),
            _a);
    });
};
exports.addDerivedValue = addDerivedValue;
