import Animated from 'react-native-reanimated';
declare type AddSharedValueTrackingProp = <TSharedValuePayload, TPropName extends string, TProps extends {
    [propName in TPropName]: Animated.SharedValue<TSharedValuePayload>;
}, TTrackingPropName extends string>(propName: TPropName, trackingPropName: TTrackingPropName, initialValue: TSharedValuePayload) => (props: TProps) => TProps & {
    [trackingPropName in TTrackingPropName]: TSharedValuePayload;
};
export declare const addSharedValueTrackingProp: AddSharedValueTrackingProp;
export {};
