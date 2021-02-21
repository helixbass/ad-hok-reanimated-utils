import Animated, {runOnJS} from 'react-native-reanimated'
import {flowMax, addState} from 'ad-hok'
import {cleanupProps} from 'ad-hok-utils'

import {addAnimatedCallback} from './addAnimatedCallback'

type AddSharedValueTrackingProp = <
  TSharedValuePayload,
  TPropName extends string,
  TProps extends {
    [propName in TPropName]: Animated.SharedValue<TSharedValuePayload>
  },
  TTrackingPropName extends string
>(
  propName: TPropName,
  trackingPropName: TTrackingPropName,
  initialValue: TSharedValuePayload,
) => (
  props: TProps,
) => TProps &
  {
    [trackingPropName in TTrackingPropName]: TSharedValuePayload
  }

const setterName = '_addSharedValueTrackingProp-setter'
export const addSharedValueTrackingProp: AddSharedValueTrackingProp = (
  propName,
  trackingPropName,
  initialValue,
) =>
  flowMax(
    addState(trackingPropName, setterName, initialValue),
    addAnimatedCallback(
      ({[propName]: propValue, [setterName]: setter}) => () => {
        runOnJS(setter)(propValue.value)
      },
    ),
    cleanupProps(setterName),
  )
