declare type AddAnimatedProps = <TProps, TAnimatedProps, TPropName extends string>(propName: TPropName, getProps: (props: TProps) => () => TAnimatedProps) => (props: TProps) => TProps & {
    [propName in TPropName]: TAnimatedProps;
};
export declare const addAnimatedProps: AddAnimatedProps;
export {};
