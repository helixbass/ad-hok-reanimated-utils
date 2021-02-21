import { CurriedPropsAdder } from 'ad-hok';
import Animated from 'react-native-reanimated';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
declare type AddPanGestureHandling = <TProps>(opts?: {
    clampX?: [number, number] | ((props: TProps) => [number, number]);
    clampY?: [number, number] | ((props: TProps) => [number, number]);
}) => CurriedPropsAdder<TProps, {
    translationX: Animated.SharedValue<number>;
    translationY: Animated.SharedValue<number>;
    onGestureEvent: (event: PanGestureHandlerGestureEvent) => void;
}>;
export declare const addPanGestureHandling: AddPanGestureHandling;
export {};
