"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAnimatedStyle = void 0;
var react_native_reanimated_1 = require("react-native-reanimated");
var ad_hok_1 = require("ad-hok");
var addAnimatedStyle = function (propName, getStyles) {
    return ad_hok_1.addProps(function (props) {
        var _a;
        return (_a = {},
            _a[propName] = react_native_reanimated_1.useAnimatedStyle(getStyles(props)),
            _a);
    });
};
exports.addAnimatedStyle = addAnimatedStyle;
