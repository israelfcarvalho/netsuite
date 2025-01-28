import React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@workspace/ui/lib/utils";

export const Separator: React.FC<SeparatorPrimitive.SeparatorProps> = ({
    className, orientation = 'horizontal', ...props
}) => {
    return (
        <SeparatorPrimitive.Root
            className={cn(
                'bg-light-neutral-40' , 
                {
                    'h-px my-4 w-full': orientation === 'horizontal',
                    'w-px mx-4 h-full': orientation === 'vertical'
                },
                className
            )}
            orientation={orientation}
            {...props}
        />
    )
}