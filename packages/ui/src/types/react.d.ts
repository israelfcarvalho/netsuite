import * as React from 'react'

declare module 'react' {
    export interface CSSProperties {
        [key: `--${string}`]: string | number
    }

    /** 
     * Function Component With Ref 
     * 
     * @template A components extra attributes
     * */
    export type FCR<P extends Record<string, any>, E extends HTMLElement, A extends Record<string, any> = Record<string, any>> = 
    React.FC<
        P & {
            ref?: React.MutableRefObject<E>
        }
    > & A
}