'use client'

import React, { useMemo } from "react";
import { Sheet, SheetContent, SheetTitle } from "../../sheet";
import { FormSheetProps } from "./sheet.types";
import { Form } from "../form";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@workspace/ui/lib/utils";
import { FormProps } from "../form.types";

export const FormSheet: React.FC<FormSheetProps> = ({
    children,
    title,
    open,
    onOpenChange,
    onSubmit,
    onCancel,
    className,
    onStateAnimationEnd,
    onReset
}) => {

    const handleAnimationEnd = () => {
        if(onStateAnimationEnd){
            onStateAnimationEnd(open ? 'open' : 'closed')
        }
    }

    const actions = useMemo<FormProps['actions']>(() => {
        const actions: FormProps['actions'] = [
            {
                id: 'cancel',
                label: 'Cancel',
                onClick: onCancel,
                variant: 'outline'
            }
        ]

        if(onReset){
            actions.push(            {
                id: 'reset',
                label: 'Reset',
                onClick: onReset,
                variant: 'ghost',
                align:"end"
            })
        }

        return actions
    }, [onCancel, onReset])

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                onAnimationEnd={handleAnimationEnd}
                className={cn(
                    "w-full sm:max-w-[700px] p-0",
                    className
                )}>
                <VisuallyHidden>
                    <SheetTitle>
                        {title}
                    </SheetTitle>
                </VisuallyHidden>

                <Form
                    actions={actions}
                    onSubmit={onSubmit}
                    title={title}
                >
                    {children}
                </Form>
            </SheetContent>
        </Sheet>
    )
} 