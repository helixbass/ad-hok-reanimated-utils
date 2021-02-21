import { CurriedPropsAdder } from 'ad-hok';
import Animated from 'react-native-reanimated';
import { SharedValuePayload } from './types';
declare type AddSharedValue = <TProps, TPropName extends string, TValue extends SharedValuePayload>(propName: TPropName, initialValue: TValue | ((props: TProps) => TValue)) => CurriedPropsAdder<TProps, {
    [propName in TPropName]: Animated.SharedValue<TValue>;
}>;
export declare const addSharedValue: AddSharedValue;
export {};
