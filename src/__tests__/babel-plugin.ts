import pluginTester from 'babel-plugin-tester'

import plugin from '../babel-plugin'

pluginTester({
  plugin,
  snapshot: true,
  tests: [
    // addAnimatedStyle()
    `
      const Component = flowMax(
        addAnimatedStyle('style', ({opacity}) => () => ({
          opacity,
        })),
        addAnimatedStyle('style', ({opacity}) => () => {
          return {
            opacity
          }
        }),
        () => null
      )
    `,
    // addDerivedValue()
    `
      const Component = flowMax(
        addDerivedValue('value', ({position}) => () => ({
          opacity: position.value * 0.1,
        })),
        addDerivedValue('value', ({position}) => () => {
          return {
            opacity: position.value * 0.1,
          }
        }),
        () => null
      )
    `,
    // addDerivedValues()
    `
      const Component = flowMax(
        addDerivedValues(({position}) => ({
          value: () => position.value * 0.1,
          otherValue: () => {
            return position.value * 0.2
          }
        })),
        () => null
      )
    `,
    // addAnimatedProps()
    `
      const Component = flowMax(
        addAnimatedProps('pathAnimatedProps', ({center}) => () => ({
          d: \`M \${center.x} \${center.y}\`,
        })),
        () => null
      )
    `,
    // addAnimatedCallback()
    `
      const Component = flowMax(
        addAnimatedCallback(({position, setValue}) => () => {
          if (position.value > 0.5) {
            setValue(true)
          }
        }),
        () => null
      )
    `,
    // addAnimatedGestureHandler()
    `
      flowMax(
        addAnimatedGestureHandler(
          {
            onStart: ({translationX, translationY}) => (_, context) => {
              context.offsetX = translationX.value
              context.offsetY = translationY.value
            },
            onActive: ({
              translationX,
              translationY,
              _clampXResolved: clampXResolved,
              _clampYResolved: clampYResolved,
            }) => (event, context) => {
              const xUnclamped = context.offsetX + event.translationX
              const yUnclamped = context.offsetY + event.translationY
              translationX.value = clampXResolved
                ? clamp(xUnclamped, clampXResolved[0], clampXResolved[1])
                : xUnclamped
              translationY.value = clampYResolved
                ? clamp(yUnclamped, clampYResolved[0], clampYResolved[1])
                : yUnclamped
            },
          },
        ),
      )
    `,
  ],
})
