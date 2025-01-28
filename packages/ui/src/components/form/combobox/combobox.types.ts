import React from "react"
import { FormFieldOption } from "../form.types"

export type ComboboxOption = FormFieldOption

export interface ComboboxProps<T extends ComboboxOption> {
    onSelect(option?: T): void
    options: T[]
    required?: boolean
    name: string
    label: string
    optionSelected?: T
}

type ComboboxComponent<T extends ComboboxOption> = React.FC<ComboboxProps<T>>
export type ComboboxFactoryInterface = {
    <T extends ComboboxOption>(): ComboboxComponent<T> 
}