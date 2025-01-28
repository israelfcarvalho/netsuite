'use client'

import React, { ChangeEventHandler, useCallback } from "react";
import * as CheckBoxPrimitives from '@radix-ui/react-checkbox'
import { Check } from "lucide-react";
import { CheckboxProps } from "./checkbox.types";

export const Checkbox: React.FC<CheckboxProps> = ({
    id,
    label,
    onChange,
    defaultChecked,
    value
}) => {

    return (
        <div className="flex flex-nowrap gap-2 text-xs text-input-label font-semibold">
            <CheckBoxPrimitives.Root
                className="rounded-sm bg-light-neutral-190 size-4 data-[state='unchecked']:bg-inherit data-[state='unchecked']:border data-[state='unchecked']:border-input-border"
                id={id} 
                defaultChecked={defaultChecked}
                onCheckedChange={onChange}
                checked={value}
            >
                <CheckBoxPrimitives.Indicator
                    className="w-full h-full inline-flex items-center justify-center"
                >
                    <Check className="text-light-neutral" size={14}/>
                </CheckBoxPrimitives.Indicator>
            </CheckBoxPrimitives.Root>

            <label htmlFor={id}>{label}</label>
        </div>
    )
}