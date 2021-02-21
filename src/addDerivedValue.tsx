import {CurriedPropsAdder, addProps} from 'ad-hok'
import Animated, {useDerivedValue} from 'react-native-reanimated'

import {SharedValuePayload} from './types'

type AddDerivedValue = <
  TProps,
  TPropName extends string,
  TValue extends SharedValuePayload
>(
  propName: TPropName,
  getValue: (props: TProps) => () => TValue,
) => CurriedPropsAdder<
  TProps,
  {
    [propName in TPropName]: Animated.SharedValue<TValue>
  }
>

export const addDerivedValue: AddDerivedValue = (propName, getValue) =>
  addProps((props) => ({
    [propName]: useDerivedValue(getValue(props as any)),
  })) as any
