import {GestureHandlerGestureEvent} from 'react-native-gesture-handler'
import Animated, {useAnimatedGestureHandler} from 'react-native-reanimated'
import {CurriedPropsAdder, addProps} from 'ad-hok'

import {mapValues} from './utils/mapValues'

type Context = Record<string, unknown>

type UncurriedHandlers<
  TEvent extends GestureHandlerGestureEvent,
  TContext extends Context
> = Animated.GestureHandlers<TEvent['nativeEvent'], TContext>

type CurriedHandlers<
  TProps,
  TEvent extends GestureHandlerGestureEvent,
  TContext extends Context
> = {
  [handlerName in keyof UncurriedHandlers<TEvent, TContext>]: (
    props: TProps,
  ) => UncurriedHandlers<TEvent, TContext>[handlerName]
}

export type SmuggleAddAnimatedGestureHandlerTypes<
  TEvent extends GestureHandlerGestureEvent,
  TContext extends Context
> = {
  event: TEvent
  context: TContext
} | null

type AddAnimatedGestureHandler = <
  TProps,
  TEvent extends GestureHandlerGestureEvent,
  TContext extends Context
>(
  handlers: CurriedHandlers<TProps, TEvent, TContext>,
  type: SmuggleAddAnimatedGestureHandlerTypes<TEvent, TContext>,
) => CurriedPropsAdder<
  TProps,
  {
    onGestureEvent: (event: TEvent) => void
  }
>

export const addAnimatedGestureHandler: AddAnimatedGestureHandler = (
  handlers,
) => {
  type TEvent = typeof handlers extends CurriedHandlers<
    any,
    infer TEventInferred,
    any
  >
    ? TEventInferred
    : never
  type TContext = typeof handlers extends CurriedHandlers<
    any,
    any,
    infer TContextInferred
  >
    ? TContextInferred
    : never

  return addProps((props) => {
    const onGestureEvent = useAnimatedGestureHandler<TEvent, TContext>(
      mapValues((handler) => handler?.(props), handlers) as UncurriedHandlers<
        TEvent,
        TContext
      >,
    )
    return {
      onGestureEvent,
    }
  })
}
