import { FormFieldOption } from "@workspace/ui/components"

export interface NetsuiteFieldOption {
    id: string
    name: string  
}

export function netsuiteOptionsToFormFieldOptions(options: NetsuiteFieldOption[]): FormFieldOption[] {
    return options.map(option => ({
        id: option.id,
        label: option.name,
        value: option.name,
    }))
}