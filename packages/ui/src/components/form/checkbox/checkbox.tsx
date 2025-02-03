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
        <div className="flex flex-nowrap gap-2 text-xs text-input-label font-semibold items-center">
            <CheckBoxPrimitives.Root
                disabled={viewMode || disabled}
                className={cn(
                    "border border-solid rounded-sm bg-light-neutral-190 size-4 data-[state='unchecked']:bg-inherit data-[state='unchecked']:border data-[state='unchecked']:border-input-border disabled:data-[state='unchecked']:border-light-neutral-70 disabled:border-light-neutral-70",
                    {"bg-transparent": disabled || viewMode}
                )}
                id={id} 
                defaultChecked={defaultChecked}
                onCheckedChange={onChange}
                checked={value}
            >
                <CheckBoxPrimitives.Indicator
                    className="w-full h-full inline-flex items-center justify-center text-light-neutral data-[disabled]:text-light-neutral-70"
                >
                    <Check size={14}/>
                </CheckBoxPrimitives.Indicator>
            </CheckBoxPrimitives.Root>

            <label htmlFor={id}>{label}</label>
        </div>
    )
}