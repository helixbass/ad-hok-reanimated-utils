import {CurriedPropsAdder, flowMax, addProps} from 'ad-hok'
import Animated from 'react-native-reanimated'
import {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import {isFunction} from 'lodash'
import {cleanupProps} from 'ad-hok-utils'

import {addSharedValues} from './addSharedValues'
import {
  addAnimatedGestureHandler,
  SmuggleAddAnimatedGestureHandlerTypes,
} from './addAnimatedGestureHandler'
import {clamp} from './utils/clamp'

type AddPanGestureHandling = <TProps>(opts?: {
  clampX?: [number, number] | ((props: TProps) => [number, number])
  clampY?: [number, number] | ((props: TProps) => [number, number])
}) => CurriedPropsAdder<
  TProps,
  {
    translationX: Animated.SharedValue<number>
    translationY: Animated.SharedValue<number>
    onGestureEvent: (event: PanGestureHandlerGestureEvent) => void
  }
>

export const addPanGestureHandling: AddPanGestureHandling = ({
  clampX,
  clampY,
} = {}) =>
  flowMax(
    addSharedValues({
      translationX: 0,
      translationY: 0,
    }),
    addProps((props) => ({
      _clampXResolved: isFunction(clampX) ? clampX(props) : clampX,
      _clampYResolved: isFunction(clampY) ? clampY(props) : clampY,
    })),
    addAnimatedGestureHandler(
      {
        onStart: ({translationX, translationY}) => (_, context) => {
          'worklet'
          context.offsetX = translationX.value
          context.offsetY = translationY.value
        },
        onActive: ({
          translationX,
          translationY,
          _clampXResolved: clampXResolved,
          _clampYResolved: clampYResolved,
        }) => (event, context) => {
          'worklet'
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
      null as SmuggleAddAnimatedGestureHandlerTypes<
        PanGestureHandlerGestureEvent,
        {
          offsetX: number
          offsetY: number
        }
      >,
    ),
    cleanupProps(['_clampXResolved', '_clampYResolved']),
  )
