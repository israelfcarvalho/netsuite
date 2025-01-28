export interface InputProps {
    name: string
    label: string
    value?: string
    required?: boolean
    onChange: (value: string) => void
}