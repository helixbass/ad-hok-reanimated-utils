"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSharedValueTrackingProp = void 0;
var react_native_reanimated_1 = require("react-native-reanimated");
var ad_hok_1 = require("ad-hok");
var ad_hok_utils_1 = require("ad-hok-utils");
var addAnimatedCallback_1 = require("./addAnimatedCallback");
var setterName = '_addSharedValueTrackingProp-setter';
var addSharedValueTrackingProp = function (propName, trackingPropName, initialValue) {
    return ad_hok_1.flowMax(ad_hok_1.addState(trackingPropName, setterName, initialValue), addAnimatedCallback_1.addAnimatedCallback(function (_a) {
        var _b = propName, propValue = _a[_b], _c = setterName, setter = _a[_c];
        return function () {
            'worklet';
            react_native_reanimated_1.runOnJS(setter)(propValue.value);
        };
    }), ad_hok_utils_1.cleanupProps(setterName));
};
exports.addSharedValueTrackingProp = addSharedValueTrackingProp;
