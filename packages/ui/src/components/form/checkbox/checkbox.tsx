'use client'

import React from "react";
import * as CheckBoxPrimitives from '@radix-ui/react-checkbox'
import { Check, X } from "lucide-react";
import { CheckboxProps } from "./checkbox.types";
import { cn } from "@workspace/ui/lib/utils";

export const Checkbox: React.FC<CheckboxProps> = ({
    id,
    label,
    onChange,
    defaultChecked,
    value,
    disabled,
    viewMode
}) => {

    return (
        <div className="flex flex-nowrap gap-2 text-xs text-input-label font-semibold">
            <CheckBoxPrimitives.Root
                disabled={viewMode || disabled}
                className={cn(
                    "border border-solid rounded-sm bg-light-neutral-190 size-4 data-[state='unchecked']:bg-inherit data-[state='unchecked']:border data-[state='unchecked']:border-input-border",
                    {"bg-transparent border-0 data-[state='unchecked']:border-none data-[state='unchecked']:border-transparent": disabled || viewMode}
                )}
                id={id} 
                defaultChecked={defaultChecked}
                onCheckedChange={onChange}
                checked={value}
            >
                <CheckBoxPrimitives.Indicator
                    className="w-full h-full inline-flex items-center justify-center"
                >
                    <Check 
                        data-disabled={disabled || viewMode} 
                        aria-disabled={disabled || viewMode} 
                        className="text-light-neutral data-[disabled=true]:text-green-600" 
                        size={14}
                    />
                </CheckBoxPrimitives.Indicator>
                {viewMode && !value && (
                    <div className="w-full h-full inline-flex items-center justify-center">
                        <X className="text-light-danger-120" size={14}/>
                    </div>
                )}
            </CheckBoxPrimitives.Root>

            <label htmlFor={id}>{label}</label>
        </div>
    )
}