import { CurriedPropsAdder } from 'ad-hok';
import Animated from 'react-native-reanimated';
import { SharedValuePayload } from './types';
declare type AddSharedValues = <TProps, TInitialValues extends {
    [name: string]: SharedValuePayload;
}>(initialValues: TInitialValues | ((props: TProps) => TInitialValues)) => CurriedPropsAdder<TProps, {
    [key in keyof TInitialValues]: Animated.SharedValue<TInitialValues[key]>;
}>;
export declare const addSharedValues: AddSharedValues;
export {};
