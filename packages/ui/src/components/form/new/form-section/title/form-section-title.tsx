import React from "react";
import { FormSectionTitleProps } from "./form-section-title.types";
import { cn } from "@workspace/ui/lib/utils";

export const FormSectionTitle: React.FCR<FormSectionTitleProps, HTMLLegendElement> = ({
    className,
    children,
    ...props
}) => {
    return (
        <legend 
            className={cn(
                'mb-4',
                className
            )}
            {...props}
        >
            {children}
        </legend>
    )
}