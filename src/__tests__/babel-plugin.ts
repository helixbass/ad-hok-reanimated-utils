import pluginTester from 'babel-plugin-tester'

import plugin from '../babel-plugin'

pluginTester({
  plugin,
  snapshot: true,
  tests: [
    `
      const Component = flowMax(
        addAnimatedStyle('style', ({opacity}) => () => ({
          opacity,
        })),
        () => null
      )
    `,
  ],
})
