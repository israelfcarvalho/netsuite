import React from "react";
import { FormControl, FormField, FormLabel } from '@radix-ui/react-form'
import { InputProps } from "./input.types";

export const Input: React.FC<InputProps> = ({
    name,
    label, 
    onChange, 
    value,
    required = false
}) => {
    return (
        <FormField name={name}>
            <FormLabel
                className="font-sans text-xs text-input-label font-semibold"
            >
                {label} 
                
                {required && <span className="ml-[2px] text-light-danger-120 text-base">*</span>}
            </FormLabel>
            <FormControl
                className="border-input-border border rounded-md w-full min-h-8 text-sm px-2 outline-input-border-selected"
                type="text" 
                name={name} 
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </FormField>
    )
}