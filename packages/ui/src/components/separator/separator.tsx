import React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@workspace/ui/lib/utils";

export const Separator: React.FC<SeparatorPrimitive.SeparatorProps> = ({
    className, ...props
}) => {
    return (
        <SeparatorPrimitive.Root
            className={cn(
                'my-2 bg-light-neutral-50 data-[orientation=horizontal]:h-px', 
                className
            )} 
            {...props}
        />
    )
}