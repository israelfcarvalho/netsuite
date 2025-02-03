import React, { ReactNode } from "react";
import { Popover } from "@radix-ui/react-popover";
import { LucideIcon } from "lucide-react";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

interface Option {
    id: string
    name: string
    icon: LucideIcon
    disabled?:boolean
    onSelected(): void
}

export type FormFieldOptionsRef = React.ElementRef<typeof Popover>
export interface FormFieldOptionsProps {
    fieldLabel: string
    options: Array<Option>
    align?: DropdownMenuContentProps['align']
}