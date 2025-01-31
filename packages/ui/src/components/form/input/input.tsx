import React from "react";
import { FormControl, FormField, FormLabel } from '@radix-ui/react-form'
import { InputProps } from "./input.types";
import { cn } from "@workspace/ui/lib/utils";

export const Input: React.FC<InputProps> = ({
    name,
    label, 
    onChange, 
    value,
    required = false,
    labeless,
    variant
}) => {
    return (
        <FormField name={name}>
            {!labeless && (
            <FormLabel
                className="font-sans text-xs text-input-label font-semibold"
            >
                {label} 
                
                {required && <span className="ml-[2px] text-light-danger-120 text-base">*</span>}
            </FormLabel>
            )}
            <FormControl
                aria-label={!!labeless ? label : undefined}
                className={cn(
                    "border-input-border border rounded-md w-full min-h-8 text-sm px-2 outline-input-border-selected",
                    {'border-none': variant === 'outline' }
                )}
                type="text"
                name={name}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </FormField>
    )
}