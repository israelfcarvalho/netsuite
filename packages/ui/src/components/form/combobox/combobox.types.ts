import React, { PropsWithChildren } from "react"
import { FormFieldOption } from "../form.types"

export type ComboboxOption = FormFieldOption

export interface ComboboxProps<T extends ComboboxOption = ComboboxOption> {
    onSelect(option?: T): void
    options: T[]
    required?: boolean
    name: string
    label: string
    optionSelected?: T
    viewMode?: boolean
    disabled?: boolean
}

type ComboboxComponent<T extends ComboboxOption> = React.FC<ComboboxProps<T>>

export type ComboboxFactoryInterface = {
    <T extends ComboboxOption>(): React.FC<ComboboxProps<T>>
}