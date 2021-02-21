"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isAddAnimatedStyle = function (_a) {
    var node = _a.node;
    return node.callee.type === 'Identifier' && node.callee.name === 'addAnimatedStyle';
};
var isAddAnimatedGestureHandler = function (_a) {
    var node = _a.node;
    return node.callee.type === 'Identifier' &&
        node.callee.name === 'addAnimatedGestureHandler';
};
var isAddDerivedValue = function (_a) {
    var node = _a.node;
    return node.callee.type === 'Identifier' && node.callee.name === 'addDerivedValue';
};
var isAddDerivedValues = function (_a) {
    var node = _a.node;
    return node.callee.type === 'Identifier' && node.callee.name === 'addDerivedValues';
};
// const isAddWorkletHandlers = ({node}: NodePath<BabelTypes.CallExpression>) =>
//   node.callee.type === 'Identifier' && node.callee.name === 'addWorkletHandlers'
var isAddAnimatedProps = function (_a) {
    var node = _a.node;
    return node.callee.type === 'Identifier' && node.callee.name === 'addAnimatedProps';
};
var isAddAnimatedCallback = function (_a) {
    var node = _a.node;
    return node.callee.type === 'Identifier' &&
        node.callee.name === 'addAnimatedCallback';
};
var transformFunction = function (_a) {
    var basePath = _a.basePath, functionNode = _a.functionNode, basePathPrefix = _a.basePathPrefix, t = _a.t, _b = _a.isCurried, isCurried = _b === void 0 ? true : _b;
    // if (!functionNode) return
    if (isCurried) {
        if (functionNode.body.type !== 'ArrowFunctionExpression')
            return;
        functionNode = functionNode.body;
    }
    if (functionNode.type !== 'ArrowFunctionExpression')
        return;
    var body = functionNode.body;
    var bodyPath = basePath.get(basePathPrefix + ".body" + (isCurried ? '.body' : ''));
    var directive = t.directive(t.directiveLiteral('worklet'));
    if (body.type === 'BlockStatement') {
        ;
        bodyPath.pushContainer('directives', directive);
    }
    else {
        bodyPath.replaceWith(t.blockStatement([t.returnStatement(body)], [directive]));
    }
};
exports.default = (function (_a) {
    var t = _a.types;
    return ({
        name: 'transform-ad-hok-reanimated',
        visitor: {
            Identifier: function () {
                return;
            },
            CallExpression: function (path) {
                var args = path.node.arguments;
                if (isAddAnimatedStyle(path) ||
                    isAddDerivedValue(path) ||
                    isAddAnimatedProps(path)) {
                    var outerFunction = args[1];
                    if (!t.isArrowFunctionExpression(outerFunction))
                        return;
                    transformFunction({
                        basePath: path,
                        functionNode: outerFunction,
                        basePathPrefix: 'arguments.1',
                        t: t,
                    });
                }
                if (isAddAnimatedCallback(path)) {
                    var outerFunction = args[0];
                    if (!t.isArrowFunctionExpression(outerFunction))
                        return;
                    transformFunction({
                        basePath: path,
                        functionNode: outerFunction,
                        basePathPrefix: 'arguments.0',
                        t: t,
                    });
                }
                if (isAddDerivedValues(path)) {
                    var outerFunction = args[0];
                    if (!t.isArrowFunctionExpression(outerFunction))
                        return;
                    var gettersObject = outerFunction.body;
                    if (!t.isObjectExpression(gettersObject))
                        return;
                    gettersObject.properties.forEach(function (property, propertyIndex) {
                        if (!t.isObjectProperty(property))
                            return;
                        var innerFunction = property.value;
                        if (!t.isArrowFunctionExpression(innerFunction))
                            return;
                        transformFunction({
                            basePath: path,
                            functionNode: innerFunction,
                            basePathPrefix: "arguments.0.body.properties." + propertyIndex + ".value",
                            t: t,
                            isCurried: false,
                        });
                    });
                }
                if (
                // isAddWorkletHandlers(path) ||
                isAddAnimatedGestureHandler(path)) {
                    var handlers = args[0];
                    if (handlers.type !== 'ObjectExpression')
                        return;
                    handlers.properties.forEach(function (handlerProperty, handlerPropertyIndex) {
                        if (!t.isObjectProperty(handlerProperty))
                            return;
                        var innerFunction = handlerProperty.value;
                        if (!t.isArrowFunctionExpression(innerFunction))
                            return;
                        transformFunction({
                            basePath: path,
                            basePathPrefix: "arguments.0.properties." + handlerPropertyIndex + ".value",
                            functionNode: innerFunction,
                            t: t,
                        });
                    });
                }
            },
        },
    });
});
