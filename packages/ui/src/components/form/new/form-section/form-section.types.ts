import React, { HTMLAttributes, ReactNode } from "react";
import { FormSectionTitle } from "./title";
import { FormSectionContent } from "./content";

export interface FormSectionProps extends HTMLAttributes<HTMLFieldSetElement> {}

export interface FormSectionChildren {
    title?: ReactNode
    content?: ReactNode
}

export interface FormSectionComponents {
    Title:  typeof FormSectionTitle
    Content: typeof FormSectionContent
}