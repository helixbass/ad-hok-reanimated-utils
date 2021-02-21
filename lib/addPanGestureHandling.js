"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPanGestureHandling = void 0;
var ad_hok_1 = require("ad-hok");
var lodash_1 = require("lodash");
var ad_hok_utils_1 = require("ad-hok-utils");
var addSharedValues_1 = require("./addSharedValues");
var addAnimatedGestureHandler_1 = require("./addAnimatedGestureHandler");
var clamp_1 = require("./utils/clamp");
var addPanGestureHandling = function (_a) {
    var _b = _a === void 0 ? {} : _a, clampX = _b.clampX, clampY = _b.clampY;
    return ad_hok_1.flowMax(addSharedValues_1.addSharedValues({
        translationX: 0,
        translationY: 0,
    }), ad_hok_1.addProps(function (props) { return ({
        _clampXResolved: lodash_1.isFunction(clampX) ? clampX(props) : clampX,
        _clampYResolved: lodash_1.isFunction(clampY) ? clampY(props) : clampY,
    }); }), addAnimatedGestureHandler_1.addAnimatedGestureHandler({
        onStart: function (_a) {
            var translationX = _a.translationX, translationY = _a.translationY;
            return function (_, context) {
                context.offsetX = translationX.value;
                context.offsetY = translationY.value;
            };
        },
        onActive: function (_a) {
            var translationX = _a.translationX, translationY = _a.translationY, clampXResolved = _a._clampXResolved, clampYResolved = _a._clampYResolved;
            return function (event, context) {
                var xUnclamped = context.offsetX + event.translationX;
                var yUnclamped = context.offsetY + event.translationY;
                translationX.value = clampXResolved
                    ? clamp_1.clamp(xUnclamped, clampXResolved[0], clampXResolved[1])
                    : xUnclamped;
                translationY.value = clampYResolved
                    ? clamp_1.clamp(yUnclamped, clampYResolved[0], clampYResolved[1])
                    : yUnclamped;
            };
        },
    }, null), ad_hok_utils_1.cleanupProps(['_clampXResolved', '_clampYResolved']));
};
exports.addPanGestureHandling = addPanGestureHandling;
