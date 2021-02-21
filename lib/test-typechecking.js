"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentBad = exports.Component = void 0;
var react_1 = __importDefault(require("react"));
var ad_hok_1 = require("ad-hok");
var react_native_reanimated_1 = __importDefault(require("react-native-reanimated"));
var react_native_svg_1 = require("react-native-svg");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var _1 = require(".");
var AnimatedSvg = react_native_reanimated_1.default.createAnimatedComponent(react_native_svg_1.Svg);
exports.Component = ad_hok_1.flowMax(_1.addSharedValues({
    position: 0,
}), _1.addDerivedValues(function (_a) {
    var position = _a.position;
    return ({
        opacity: function () { return position.value * 0.1; },
    });
}), _1.addDerivedValue('translateX', function (_a) {
    var position = _a.position;
    return function () { return position.value * 0.3; };
}), ad_hok_1.addState('num', 'setNum', 0), _1.addAnimatedCallback(function (_a) {
    var opacity = _a.opacity, setNum = _a.setNum;
    return function () {
        if (opacity.value > 0.5) {
            setNum(opacity.value);
        }
    };
}), _1.addAnimatedStyle('style', function (_a) {
    var opacity = _a.opacity, translateX = _a.translateX;
    return function () { return ({
        opacity: opacity.value,
        transform: [
            {
                translateX: translateX.value,
            },
        ],
    }); };
}), _1.addAnimatedProps('svgProps', function (_a) {
    var opacity = _a.opacity;
    return function () { return ({
        opacity: opacity.value,
    }); };
}), _1.addSharedValueTrackingProp('opacity', 'opacityNum', 0), ad_hok_1.addProps(function (_a) {
    var opacityNum = _a.opacityNum;
    return ({
        greater: opacityNum + 1,
    });
}), _1.addSharedValues({
    translationX: 0,
}), _1.addAnimatedGestureHandler({
    onStart: function (_a) {
        var translationX = _a.translationX;
        return function (_, context) {
            context.offsetX = translationX.value;
        };
    },
    onActive: function (_a) {
        var translationX = _a.translationX;
        return function (event, context) {
            translationX.value = context.offsetX + event.translationX;
        };
    },
}, null), ad_hok_1.addProps(function (_a) {
    var onGestureEventFirst = _a.onGestureEvent;
    return ({
        onGestureEventFirst: onGestureEventFirst,
    });
}), _1.addPanGestureHandling(), function (_a) {
    var svgProps = _a.svgProps, style = _a.style, onGestureEventFirst = _a.onGestureEventFirst, onGestureEvent = _a.onGestureEvent;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_native_gesture_handler_1.PanGestureHandler, { onGestureEvent: onGestureEventFirst },
            react_1.default.createElement(AnimatedSvg, { animatedProps: svgProps, style: style }),
            ","),
        react_1.default.createElement(react_native_gesture_handler_1.PanGestureHandler, { onGestureEvent: onGestureEvent },
            react_1.default.createElement(react_native_reanimated_1.default.View, null))));
});
exports.ComponentBad = ad_hok_1.flowMax(_1.addSharedValues({
    position: 0,
}), _1.addDerivedValues(function (_a) {
    var position = _a.position;
    return ({
        // @ts-expect-error left-hand side
        opacityBad: function () { return position * 0.1; },
        opacity: function () { return position.value * 0.1; },
    });
}), _1.addDerivedValue('translateX', function (_a) {
    var position = _a.position;
    return function () {
        // @ts-expect-error left-hand side
        return position * 0.3;
    };
}), ad_hok_1.addState('str', 'setStr', ''), _1.addAnimatedCallback(function (_a) {
    var opacity = _a.opacity, setStr = _a.setStr;
    return function () {
        if (opacity.value > 0.5) {
            // @ts-expect-error is not assignable
            setStr(opacity.value);
        }
    };
}), 
// @ts-expect-error The types of 'opacity' are incompatible
_1.addAnimatedStyle('style', function (_a) {
    var opacity = _a.opacity, translateX = _a.translateX;
    return function () { return ({
        // @ts-expect-error is not assignable
        opacity: opacity,
        transform: [
            {
                translateX: translateX.value,
            },
        ],
    }); };
}), _1.addSharedValueTrackingProp('opacity', 'opacityNum', ''), _1.addAnimatedProps('svgProps', function (_a) {
    var opacity = _a.opacity;
    return function () { return ({
        opacity: opacity,
    }); };
}), ad_hok_1.addProps(function (_a) {
    var opacityNum = _a.opacityNum;
    return ({
        greater: opacityNum + 1,
    });
}), _1.addSharedValues({
    translationX: 0,
}), _1.addAnimatedGestureHandler({
    onStart: function (_a) {
        var translationX = _a.translationX;
        return function (_, context) {
            // @ts-expect-error 'offsetX' does not exist
            context.offsetX = translationX.value;
        };
    },
    onActive: function (_a) {
        var translationX = _a.translationX;
        return function (event, context) {
            translationX.value =
                // @ts-expect-error 'offsetX' does not exist
                context.offsetX +
                    // @ts-expect-error 'translationX' does not exist
                    event.translationX;
        };
    },
}, null), function (_a) {
    var svgProps = _a.svgProps;
    return (react_1.default.createElement(AnimatedSvg
    // @ts-expect-error is not assignable
    , { 
        // @ts-expect-error is not assignable
        animatedProps: svgProps }));
});
