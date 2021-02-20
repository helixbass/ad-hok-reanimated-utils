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
  ],
})
