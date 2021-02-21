import { CurriedUnchangedProps } from 'ad-hok';
declare type AddAnimatedCallback = <TProps>(callback: (props: TProps) => () => void) => CurriedUnchangedProps<TProps>;
export declare const addAnimatedCallback: AddAnimatedCallback;
export {};
