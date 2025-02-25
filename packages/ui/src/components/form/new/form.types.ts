import React, { ReactNode, FunctionComponentElement, ComponentProps } from "react"
import { FormSection } from "./form-section"

export type FormValue = Record<string, any>
type FormValueEmpty = Record<string, never>

export interface FormProps<T extends FormValue = FormValueEmpty> extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'> {
    onSubmit(values: T): void
    children: FunctionComponentElement<ComponentProps<typeof FormSection>>[]
}

export type FormDefaults<T extends FormValue> = {
    [K in keyof T]: T[K]
}

export type FormFields<T extends FormValue> = {
    [K in keyof T]: {
        name: K,
        default: T[K]
    }
}