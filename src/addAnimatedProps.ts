import {addProps} from 'ad-hok'
import {useAnimatedProps} from 'react-native-reanimated'

type AddAnimatedProps = <TProps, TAnimatedProps, TPropName extends string>(
  propName: TPropName,
  getProps: (props: TProps) => () => TAnimatedProps,
) => (
  props: TProps,
) => TProps &
  {
    [propName in TPropName]: TAnimatedProps
  }

export const addAnimatedProps: AddAnimatedProps = (propName, getProps) =>
  addProps((props) => ({
    [propName]: useAnimatedProps(getProps(props as any)),
  })) as any
