type InputVariant = 'outline'

export interface InputProps {
    name: string
    label: string
    value?: string
    required?: boolean
    onChange: (value: string) => void
    labeless?:boolean
    variant?: InputVariant
    disabled?: boolean
    viewMode?: boolean
}