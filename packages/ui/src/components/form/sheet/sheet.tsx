'use client'

import React from "react";
import { Sheet, SheetContent, SheetTitle } from "../../sheet";
import { FormSheetProps } from "./sheet.types";
import { Form } from "../form";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@workspace/ui/lib/utils";

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
                    onCancel={onCancel}
                    onSubmit={onSubmit}
                    onReset={onReset} 
                    title={title}
                >
                    {children}
                </Form>
            </SheetContent>
        </Sheet>
    )
} 