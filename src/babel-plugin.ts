import * as BabelTypes from '@babel/types'
import {Visitor, NodePath} from '@babel/traverse'

const isAddAnimatedStyle = ({node}: NodePath<BabelTypes.CallExpression>) =>
  node.callee.type === 'Identifier' && node.callee.name === 'addAnimatedStyle'
// const isAddAnimatedGestureHandler = ({
//   node,
// }: NodePath<BabelTypes.CallExpression>) =>
//   node.callee.type === 'Identifier' &&
//   node.callee.name === 'addAnimatedGestureHandler'
const isAddDerivedValue = ({node}: NodePath<BabelTypes.CallExpression>) =>
  node.callee.type === 'Identifier' && node.callee.name === 'addDerivedValue'
const isAddDerivedValues = ({node}: NodePath<BabelTypes.CallExpression>) =>
  node.callee.type === 'Identifier' && node.callee.name === 'addDerivedValues'
const isAddWorkletHandlers = ({node}: NodePath<BabelTypes.CallExpression>) =>
  node.callee.type === 'Identifier' && node.callee.name === 'addWorkletHandlers'
const isAddAnimatedProps = ({node}: NodePath<BabelTypes.CallExpression>) =>
  node.callee.type === 'Identifier' && node.callee.name === 'addAnimatedProps'
const isAddAnimatedCallback = ({node}: NodePath<BabelTypes.CallExpression>) =>
  node.callee.type === 'Identifier' &&
  node.callee.name === 'addAnimatedCallback'

const transformFunction = ({
  basePath,
  functionNode,
  basePathPrefix,
  t,
  isCurried = true,
}: {
  basePath: NodePath<BabelTypes.CallExpression>
  functionNode: BabelTypes.ArrowFunctionExpression
  basePathPrefix: string
  t: typeof BabelTypes
  isCurried?: boolean
}) => {
  // if (!functionNode) return
  if (isCurried) {
    if (functionNode.body.type !== 'ArrowFunctionExpression') return
    functionNode = functionNode.body
  }
  if (functionNode.type !== 'ArrowFunctionExpression') return
  const {body} = functionNode
  const bodyPath = basePath.get(
    `${basePathPrefix}.body${isCurried ? '.body' : ''}`,
  ) as NodePath<BabelTypes.BlockStatement> | NodePath<BabelTypes.Expression>
  const directive = t.directive(t.directiveLiteral('worklet'))
  if (body.type === 'BlockStatement') {
    ;(bodyPath as NodePath<BabelTypes.BlockStatement>).pushContainer(
      'directives',
      directive,
    )
  } else {
    bodyPath.replaceWith(
      t.blockStatement([t.returnStatement(body)], [directive]),
    )
  }
}

export default ({
  types: t,
}: {
  types: typeof BabelTypes
}): {
  name: string
  visitor: Visitor<{}>
} => ({
  name: 'transform-ad-hok-reanimated',
  visitor: {
    Identifier: () => {
      return
    },
    CallExpression: (path) => {
      const {
        node: {arguments: args},
      } = path
      if (
        isAddAnimatedStyle(path) ||
        isAddDerivedValue(path) ||
        isAddAnimatedProps(path)
      ) {
        const outerFunction = args[1]
        if (!t.isArrowFunctionExpression(outerFunction)) return
        transformFunction({
          basePath: path,
          functionNode: outerFunction,
          basePathPrefix: 'arguments.1',
          t,
        })
      }
      if (isAddAnimatedCallback(path)) {
        const outerFunction = args[0]
        if (!t.isArrowFunctionExpression(outerFunction)) return
        transformFunction({
          basePath: path,
          functionNode: outerFunction,
          basePathPrefix: 'arguments.0',
          t,
        })
      }
      if (isAddDerivedValues(path)) {
        const outerFunction = args[0]
        if (!t.isArrowFunctionExpression(outerFunction)) return
        const gettersObject = outerFunction.body
        if (!t.isObjectExpression(gettersObject)) return
        gettersObject.properties.forEach((property, propertyIndex) => {
          if (!t.isObjectProperty(property)) return
          const innerFunction = property.value
          if (!t.isArrowFunctionExpression(innerFunction)) return
          transformFunction({
            basePath: path,
            functionNode: innerFunction,
            basePathPrefix: `arguments.0.body.properties.${propertyIndex}.value`,
            t,
            isCurried: false,
          })
        })
      }
      if (isAddWorkletHandlers(path)) {
        const handlers = args[0]
        if (handlers.type !== 'ObjectExpression') return
        handlers.properties.forEach((handlerProperty, handlerPropertyIndex) => {
          if (!t.isObjectProperty(handlerProperty)) return
          const innerFunction = handlerProperty.value
          if (!t.isArrowFunctionExpression(innerFunction)) return
          transformFunction({
            basePath: path,
            basePathPrefix: `arguments.0.properties.${handlerPropertyIndex}.value`,
            functionNode: innerFunction,
            t,
          })
        })
      }
      // if (isAddAnimatedGestureHandler(path)) {
      //   path = path.parentPath
      //   const handlers = path.node.arguments[0]
      //   if (handlers.type !== 'ObjectExpression') return
      //   handlers.properties.forEach((handlerProperty, handlerPropertyIndex) => {
      //     transformFunction({
      //       basePath: path,
      //       basePathPrefix: `arguments.0.properties.${handlerPropertyIndex}.value`,
      //       functionNode: handlerProperty.value,
      //       t,
      //     })
      //   })
      // }
    },
  },
})
