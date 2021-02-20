import {CurriedPropsAdder, addProps} from 'ad-hok'
import Animated, {useSharedValue} from 'react-native-reanimated'

import {SharedValuePayload} from './types'
import {isFunction} from './utils/isFunction'
import {mapValues} from './utils/mapValues'

type AddSharedValues = <
  TProps,
  TInitialValues extends {
    [name: string]: SharedValuePayload
  }
>(
  initialValues: TInitialValues | ((props: TProps) => TInitialValues),
) => CurriedPropsAdder<
  TProps,
  {
    [key in keyof TInitialValues]: Animated.SharedValue<TInitialValues[key]>
  }
>

export const addSharedValues: AddSharedValues = (initialValues) =>
  addProps((props) =>
    mapValues(
      (value) => useSharedValue(value),
      isFunction(initialValues) ? initialValues(props as any) : initialValues,
    ),
  ) as any
