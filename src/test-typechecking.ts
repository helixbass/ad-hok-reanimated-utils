import {FC} from 'react'
import {flowMax, addState, addProps} from 'ad-hok'

import {
  addSharedValues,
  addDerivedValues,
  addAnimatedStyle,
  addAnimatedProps,
  addAnimatedCallback,
  addSharedValueTrackingProp,
} from '.'

export const Component: FC = flowMax(
  addSharedValues({
    position: 0,
  }),
  addDerivedValues(({position}) => ({
    opacity: () => position.value * 0.1,
  })),
  addState('num', 'setNum', 0),
  addAnimatedCallback(({opacity, setNum}) => () => {
    if (opacity.value > 0.5) {
      setNum(opacity.value)
    }
  }),
  addAnimatedStyle('style', ({opacity}) => () => ({
    opacity: opacity.value,
  })),
  addAnimatedProps('svgProps', ({opacity}) => () => ({
    opacity: opacity.value,
  })),
  addSharedValueTrackingProp('opacity', 'opacityNum', 0),
  addProps(({opacityNum}) => ({
    greater: opacityNum + 1,
  })),
  () => null,
)
