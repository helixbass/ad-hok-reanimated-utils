import Animated, {useAnimatedStyle} from 'react-native-reanimated'
import {ViewStyle, ImageStyle, TextStyle} from 'react-native'
import {CurriedPropsAdder, addProps} from 'ad-hok'

type AddAnimatedStyle = <
  TPropName extends string,
  TProps extends {},
  TStyle extends Animated.AnimatedStyleProp<ViewStyle | ImageStyle | TextStyle>
>(
  propName: TPropName,
  getStyles: (props: TProps) => () => TStyle,
) => CurriedPropsAdder<
  TProps,
  {
    [propName in TPropName]: TStyle
  }
>

export const addAnimatedStyle: AddAnimatedStyle = (propName, getStyles) =>
  addProps((props) => ({
    [propName]: useAnimatedStyle(getStyles(props as any)),
  })) as any
