type InputVariant = 'outline'

type DefaultValidatorKey = 'email'

export type DefaultValidator = {
    [V in DefaultValidatorKey]: (value: string) => boolean | string
}

type Validator = DefaultValidatorKey | ((value: string) => boolean | string)

export interface InputProps {
    name: string
    label: string
    value?: string
    required?: boolean
    onChange?: (value: string) => void
    labeless?:boolean
    variant?: InputVariant
    disabled?: boolean
    viewMode?: boolean
    validator?: Validator
}
