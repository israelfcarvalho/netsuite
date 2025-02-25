import React, { useMemo } from "react";
import { FormSectionChildren, FormSectionComponents, FormSectionProps } from "./form-section.types";
import { cn } from "@workspace/ui/lib/utils";
import { FormSectionTitle } from "./title";
import { FormSectionContent } from "./content";

export const FormSection: React.FCR<FormSectionProps, HTMLFieldSetElement, FormSectionComponents> = ({
    children: incomingChildren,
    className,
    ...props
}) => {
    const { title, content } = useMemo<FormSectionChildren>(() => {
        const children: FormSectionChildren = {}

        React.Children.forEach(incomingChildren, child => {
            if(React.isValidElement(child)){
                if(child.type === FormSectionTitle){
                    children.title = child
                }

                if(child.type === FormSectionContent){
                    children.content = child
                }
            }
        })

        return children
    }, [incomingChildren])

    return (
        <fieldset 
            className={cn(
                'flex flex-col flex-nowrap items-stretch',
                className
            )}
            {...props}
        >
            {title}
            {content}
        </fieldset>
    )
}

FormSection.Title = FormSectionTitle
FormSection.Content = FormSectionContent