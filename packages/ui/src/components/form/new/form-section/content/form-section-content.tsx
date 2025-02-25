import React from "react";
import { FormSectionContentProps } from "./form-section-content.types";
import { cn } from "@workspace/ui/lib/utils";

export const FormSectionContent: React.FCR<FormSectionContentProps, HTMLDivElement> = ({
    className,
    ...props
}) => {
    return (
        <div
            className={cn(
                'grid gap-4',
                className
            )}
            {...props}
        />
    )
}