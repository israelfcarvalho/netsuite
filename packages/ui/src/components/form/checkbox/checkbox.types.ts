import { FormEventHandler } from "react"

export interface CheckboxProps {
    id: string
    label: string
    defaultChecked?: boolean
    onChange(value: boolean): void
    value: boolean
    viewMode?: boolean
    disabled?: boolean
}