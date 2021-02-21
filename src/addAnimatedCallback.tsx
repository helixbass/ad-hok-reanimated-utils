import {CurriedUnchangedProps} from 'ad-hok'
import {useDerivedValue} from 'react-native-reanimated'

type AddAnimatedCallback = <TProps>(
  callback: (props: TProps) => () => void,
) => CurriedUnchangedProps<TProps>

export const addAnimatedCallback: AddAnimatedCallback = (callback) => (
  props,
) => {
  useDerivedValue(callback(props))

  return props
}
