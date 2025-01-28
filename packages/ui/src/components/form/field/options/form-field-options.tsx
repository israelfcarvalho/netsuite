'use client'

import React from "react";
import { FormFieldOptionsProps, FormFieldOptionsRef } from "./form-field-options.types";
import { Settings } from "lucide-react";
import { 
    DropdownMenu, 
    DropdownMenuTrigger,
    DropdownMenuPortal,
    DropdownMenuContent,
    DropdownMenuItem
} from '@radix-ui/react-dropdown-menu'

export const FormFieldOptions = React.forwardRef<FormFieldOptionsRef, FormFieldOptionsProps>(({
    fieldLabel,
    options,
    ...props
}, ref) => {
    if(!options.length) {
        return null
    }

    return (
        <DropdownMenu {...props}>
            <DropdownMenuTrigger
                className="text-light-neutral-100 outline-inherit outline-offset-1 outline-1 focus:outline-double rounded-sm"
                aria-label={`${fieldLabel} Options`}
            >
                <Settings 
                    className="text-inherit" 
                    size={18}
                />
            </DropdownMenuTrigger>

            <DropdownMenuPortal>
                <DropdownMenuContent 
                    className="bg-light-neutral-10 shadow-[0_0_8px] shadow-light-neutral-190 rounded-md overflow-hidden"
                    align="start"
                >
                    {options.map(option => (!option.disabled &&
                        <DropdownMenuItem
                            className='flex items-center gap-1 p-2 text-xs focus:outline-none focus:bg-light-brand-30'
                            key={option.id}
                            onSelect={option.onSelected}
                        >
                            <option.icon size={18}></option.icon>
                            {option.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    )
})