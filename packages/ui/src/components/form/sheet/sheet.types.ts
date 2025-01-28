import { ReactNode } from "react";

export type FormSheetState = 'open'| 'closed'

export interface FormSheetProps {
    children: ReactNode
    title: string
    open: boolean
    onOpenChange(open: boolean): void
    onSubmit: VoidFunction
    onCancel: VoidFunction
    onReset?: VoidFunction
    className?: string
    onStateAnimationEnd?: (state: FormSheetState) => void
}