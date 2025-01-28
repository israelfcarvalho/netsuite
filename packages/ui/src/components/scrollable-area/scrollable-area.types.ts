import { CSSProperties, ReactNode, StyleHTMLAttributes } from "react";

export interface ScrollableAreaProps {
    className?: string
    classNameViewport?:string
    children: ReactNode
    style?: CSSProperties
    orientation?: 'vertical' | 'horizontal'
}