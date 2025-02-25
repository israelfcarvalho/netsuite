import React, { FormEventHandler } from "react"
import { FormControl, FormField, FormLabel, Form } from "@radix-ui/react-form"
import { useController } from "react-hook-form"

import { cn } from "@workspace/ui/lib/utils"
import { validateEmail } from '@workspace/ui/lib/validators'
import { DefaultValidator, InputProps } from "./input.types"

const validators: DefaultValidator = {
    email(email: string){
        const valid = validateEmail(email)

        return valid || 'Invalid email.' 
    }
}

export const Input: React.FCR<InputProps, HTMLInputElement> = ({
    name,
    label, 
    onChange, 
    value,
    required = false,
    labeless,
    variant,
    disabled,
    viewMode,
    validator,
    ...props
}) => {
    const { field } = useController<{test: string}, 'test'>({
        name: name as 'test',
        defaultValue: value,
        rules: {
            required,
            validate: typeof validator === 'string' ? validators[validator] : validator
        },
        disabled: disabled || viewMode
    })

    const handleChange: FormEventHandler<HTMLInputElement> = event => {
        const value = event.currentTarget.value

        field.onChange(value)
        onChange?.(value)
    }

    return (
        <FormField name={name}>
            {!labeless && (
            <FormLabel
                className="font-sans text-xs text-input-label font-semibold"
            >
                {label}
                {required && !viewMode && <span className="ml-[2px] text-light-danger-120 text-base">*</span>}
            </FormLabel>
            )}
            <FormControl
                disabled={field.disabled}
                aria-label={!!labeless ? label : undefined}
                className={cn(
                    "border-input-border border border-solid rounded-md w-full min-h-8 text-sm px-2 outline-input-border-selected disabled:opacity-50",
                    {
                        'border-none': variant === 'outline',
                        'border-0 rounded-none px-0 bg-transparent': !!viewMode
                    }
                )}
                type="text"
                value={field.value}
                onChange={handleChange}
                {...props}
            />
        </FormField>
    )
}
