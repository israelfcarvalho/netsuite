'use client'

import React, { FormEventHandler, useCallback } from "react";
import { Form as FormPrimitive } from '@radix-ui/react-form'

import { FormProps } from "./form.types";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "../button/button";
import { ScrollableArea } from "../scrollable-area";

const headerAndContentSyncSpaceClassName = '@2xl:px-10 px-4'

export const Form: React.FC<FormProps> = ({ 
    children,
    title,
    subtitle,
    onSubmit,
    onCancel,
    onReset,
    submitLabel = 'Save',
    contentClassname,
    logo
}) => {
    const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((event) => {
        event.preventDefault()
        event.stopPropagation()
        onSubmit(event)
    }, [onSubmit])

    return (
        <FormPrimitive
            className="@container flex flex-col w-full @ h-full bg-light-neutral-00" 
            onSubmit={handleSubmit}
        >
            <div className={cn(
                headerAndContentSyncSpaceClassName,
                "py-4 bg-light-neutral-30 shadow-lg z-10",
                "grid grid-flow-col grid-rows-[repeat(2,minmax(0,auto))] items-center"
            )}>
                <div>
                    {!!title && <h2 className="text-xl font-bold">{title}</h2>}

                    {!!subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                </div>

                <div 
                    className={cn(
                        !!title || !!subtitle ? 'mt-3' : '',
                        'flex gap-4'
                    )}>
                    <Button type="submit">{submitLabel}</Button>

                    {!!onCancel && (
                        <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    )}

                    {!!onReset && (
                        <Button 
                            className="ml-auto" 
                            variant="ghost" 
                            onClick={onReset}
                        >
                            Reset
                        </Button>
                    )}
                </div>
                {!!logo && (
                    <div className="justify-self-end h-14 row-span-2">{logo}</div>
                )}
            </div>
            
            <ScrollableArea 
                className={cn('flex-1')}
                classNameViewport={cn("px-6 pt-4 pb-8", headerAndContentSyncSpaceClassName, contentClassname)}
            >
                {children}
            </ScrollableArea>
        </FormPrimitive>
    )
}
