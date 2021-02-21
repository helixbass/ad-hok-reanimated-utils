import { CurriedPropsAdder } from 'ad-hok';
import Animated from 'react-native-reanimated';
import { SharedValuePayload } from './types';
declare type AddDerivedValues = <TProps, TValueGetters extends {
    [name: string]: () => SharedValuePayload;
}>(getValues: (props: TProps) => TValueGetters) => CurriedPropsAdder<TProps, {
    [key in keyof TValueGetters]: Animated.SharedValue<ReturnType<TValueGetters[key]>>;
}>;
export declare const addDerivedValues: AddDerivedValues;
export {};
