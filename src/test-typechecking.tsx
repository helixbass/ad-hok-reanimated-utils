import React, {FC} from 'react'
import {flowMax, addState, addProps} from 'ad-hok'
import Animated from 'react-native-reanimated'
import {Svg} from 'react-native-svg'
import {
  PanGestureHandlerGestureEvent,
  PanGestureHandler,
  RotationGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'

import {
  addSharedValues,
  addDerivedValues,
  addAnimatedStyle,
  addAnimatedProps,
  addAnimatedCallback,
  addSharedValueTrackingProp,
  addDerivedValue,
  addAnimatedGestureHandler,
  SmuggleAddAnimatedGestureHandlerTypes,
  addPanGestureHandling,
} from '.'

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

export const Component: FC = flowMax(
  addSharedValues({
    position: 0,
  }),
  addDerivedValues(({position}) => ({
    opacity: () => position.value * 0.1,
  })),
  addDerivedValue('translateX', ({position}) => () => position.value * 0.3),
  addState('num', 'setNum', 0),
  addAnimatedCallback(({opacity, setNum}) => () => {
    if (opacity.value > 0.5) {
      setNum(opacity.value)
    }
  }),
  addAnimatedStyle('style', ({opacity, translateX}) => () => ({
    opacity: opacity.value,
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  })),
  addAnimatedProps('svgProps', ({opacity}) => () => ({
    opacity: opacity.value,
  })),
  addSharedValueTrackingProp('opacity', 'opacityNum', 0),
  addProps(({opacityNum}) => ({
    greater: opacityNum + 1,
  })),
  addSharedValues({
    translationX: 0,
  }),
  addAnimatedGestureHandler(
    {
      onStart: ({translationX}) => (_, context) => {
        context.offsetX = translationX.value
      },
      onActive: ({translationX}) => (event, context) => {
        translationX.value = context.offsetX + event.translationX
      },
    },
    null as SmuggleAddAnimatedGestureHandlerTypes<
      PanGestureHandlerGestureEvent,
      {
        offsetX: number
      }
    >,
  ),
  addProps(({onGestureEvent: onGestureEventFirst}) => ({
    onGestureEventFirst,
  })),
  addPanGestureHandling(),
  ({svgProps, style, onGestureEventFirst, onGestureEvent}) => (
    <>
      <PanGestureHandler onGestureEvent={onGestureEventFirst}>
        <AnimatedSvg animatedProps={svgProps} style={style} />,
      </PanGestureHandler>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View />
      </PanGestureHandler>
    </>
  ),
)

export const ComponentBad: FC = flowMax(
  addSharedValues({
    position: 0,
  }),
  addDerivedValues(({position}) => ({
    // @ts-expect-error left-hand side
    opacityBad: () => position * 0.1,
    opacity: () => position.value * 0.1,
  })),
  addDerivedValue('translateX', ({position}) => () =>
    // @ts-expect-error left-hand side
    position * 0.3,
  ),
  addState('str', 'setStr', ''),
  addAnimatedCallback(({opacity, setStr}) => () => {
    if (opacity.value > 0.5) {
      // @ts-expect-error is not assignable
      setStr(opacity.value)
    }
  }),
  // @ts-expect-error The types of 'opacity' are incompatible
  addAnimatedStyle('style', ({opacity, translateX}) => () => ({
    // @ts-expect-error is not assignable
    opacity: opacity,
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  })),
  addSharedValueTrackingProp('opacity', 'opacityNum', ''),
  addAnimatedProps('svgProps', ({opacity}) => () => ({
    opacity: opacity,
  })),
  addProps(({opacityNum}) => ({
    greater: opacityNum + 1,
  })),
  addSharedValues({
    translationX: 0,
  }),
  addAnimatedGestureHandler(
    {
      onStart: ({translationX}) => (_, context) => {
        // @ts-expect-error 'offsetX' does not exist
        context.offsetX = translationX.value
      },
      onActive: ({translationX}) => (event, context) => {
        translationX.value =
          // @ts-expect-error 'offsetX' does not exist
          context.offsetX +
          // @ts-expect-error 'translationX' does not exist
          event.translationX
      },
    },
    null as SmuggleAddAnimatedGestureHandlerTypes<
      RotationGestureHandlerGestureEvent,
      {
        offsetY: number
      }
    >,
  ),
  ({svgProps}) => (
    <AnimatedSvg
      // @ts-expect-error is not assignable
      animatedProps={svgProps}
    />
  ),
)
