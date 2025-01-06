interface Option {
    value: string
    label: string
}

export interface ComboboxProps {
    onValueChange(value: string): void
    options: Option[]
}