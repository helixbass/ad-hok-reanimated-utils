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
        () => null
      )
    `,
    // addDerivedValue()
    `
      const Component = flowMax(
        addDerivedValue('value', ({position}) => () => ({
          opacity: position.value * 0.1,
        })),
        () => null
      )
    `,
  ],
})
