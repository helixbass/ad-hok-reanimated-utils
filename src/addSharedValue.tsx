import {CurriedPropsAdder, addProps} from 'ad-hok'
import Animated, {useSharedValue} from 'react-native-reanimated'
import {isFunction} from 'lodash'

import {SharedValuePayload} from './types'

type AddSharedValue = <
  TProps,
  TPropName extends string,
  TValue extends SharedValuePayload
>(
  propName: TPropName,
  initialValue: TValue | ((props: TProps) => TValue),
) => CurriedPropsAdder<
  TProps,
  {
    [propName in TPropName]: Animated.SharedValue<TValue>
  }
>

export const addSharedValue: AddSharedValue = (propName, initialValue) =>
  addProps((props) => ({
    [propName]: useSharedValue(
      isFunction(initialValue) ? initialValue(props as any) : initialValue,
    ),
  })) as any
