import { GestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { CurriedPropsAdder } from 'ad-hok';
declare type Context = Record<string, unknown>;
declare type UncurriedHandlers<TEvent extends GestureHandlerGestureEvent, TContext extends Context> = Animated.GestureHandlers<TEvent['nativeEvent'], TContext>;
declare type CurriedHandlers<TProps, TEvent extends GestureHandlerGestureEvent, TContext extends Context> = {
    [handlerName in keyof UncurriedHandlers<TEvent, TContext>]: (props: TProps) => UncurriedHandlers<TEvent, TContext>[handlerName];
};
export declare type SmuggleAddAnimatedGestureHandlerTypes<TEvent extends GestureHandlerGestureEvent, TContext extends Context> = {
    event: TEvent;
    context: TContext;
} | null;
declare type AddAnimatedGestureHandler = <TProps, TEvent extends GestureHandlerGestureEvent, TContext extends Context>(handlers: CurriedHandlers<TProps, TEvent, TContext>, type: SmuggleAddAnimatedGestureHandlerTypes<TEvent, TContext>) => CurriedPropsAdder<TProps, {
    onGestureEvent: (event: TEvent) => void;
}>;
export declare const addAnimatedGestureHandler: AddAnimatedGestureHandler;
export {};
