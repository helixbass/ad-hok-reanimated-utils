"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAnimatedGestureHandler = void 0;
var react_native_reanimated_1 = require("react-native-reanimated");
var ad_hok_1 = require("ad-hok");
var mapValues_1 = require("./utils/mapValues");
var addAnimatedGestureHandler = function (handlers) {
    return ad_hok_1.addProps(function (props) {
        var onGestureEvent = react_native_reanimated_1.useAnimatedGestureHandler(mapValues_1.mapValues(function (handler) { return handler === null || handler === void 0 ? void 0 : handler(props); }, handlers));
        return {
            onGestureEvent: onGestureEvent,
        };
    });
};
exports.addAnimatedGestureHandler = addAnimatedGestureHandler;
