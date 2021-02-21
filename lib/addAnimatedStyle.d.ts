import Animated from 'react-native-reanimated';
import { ViewStyle, ImageStyle, TextStyle } from 'react-native';
import { CurriedPropsAdder } from 'ad-hok';
declare type AddAnimatedStyle = <TPropName extends string, TProps extends {}, TStyle extends Animated.AnimatedStyleProp<ViewStyle | ImageStyle | TextStyle>>(propName: TPropName, getStyles: (props: TProps) => () => TStyle) => CurriedPropsAdder<TProps, {
    [propName in TPropName]: TStyle;
}>;
export declare const addAnimatedStyle: AddAnimatedStyle;
export {};
