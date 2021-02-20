import {CurriedPropsAdder, addProps} from 'ad-hok'
import Animated, {useDerivedValue} from 'react-native-reanimated'

import {SharedValuePayload} from './types'
import {mapValues} from './utils/mapValues'

type AddDerivedValues = <
  TProps,
  TValueGetters extends {
    [name: string]: () => SharedValuePayload
  }
>(
  getValues: (props: TProps) => TValueGetters,
) => CurriedPropsAdder<
  TProps,
  {
    [key in keyof TValueGetters]: Animated.SharedValue<
      ReturnType<TValueGetters[key]>
    >
  }
>

export const addDerivedValues: AddDerivedValues = (getValues) =>
  addProps((props) =>
    mapValues((getter) => useDerivedValue(getter), getValues(props as any)),
  ) as any
