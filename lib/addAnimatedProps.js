"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAnimatedProps = void 0;
var ad_hok_1 = require("ad-hok");
var react_native_reanimated_1 = require("react-native-reanimated");
var addAnimatedProps = function (propName, getProps) {
    return ad_hok_1.addProps(function (props) {
        var _a;
        return (_a = {},
            _a[propName] = react_native_reanimated_1.useAnimatedProps(getProps(props)),
            _a);
    });
};
exports.addAnimatedProps = addAnimatedProps;
