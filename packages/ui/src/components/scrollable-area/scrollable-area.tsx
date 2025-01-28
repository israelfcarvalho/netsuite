import React from "react";
import { ScrollArea, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from "@radix-ui/react-scroll-area";

import { ScrollableAreaProps } from "./scrollable-area.types";
import { cn } from "@workspace/ui/lib/utils";
import './scrollable-area.css'

export const ScrollableArea = React.forwardRef<HTMLDivElement, ScrollableAreaProps>(({
    children,
    className,
    classNameViewport,
    style,
}, ref) => {

    return (
        <ScrollArea 
            className={cn(
                "flex flex-col w-full bg-light-neutral-10 overflow-hidden",
                className
            )}
            style={style}
        >
            <ScrollAreaViewport
                className={cn("size-full", classNameViewport)}
            >
                {children}
            </ScrollAreaViewport>
            
            <ScrollAreaScrollbar
                ref={ref}
                className=" flex touch-none select-none bg-light-neutral-10 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-light-neutral-20 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                orientation="vertical"
            >
                <ScrollAreaThumb className="relative flex-1 rounded-[10px] bg-light-neutral-50 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
            </ScrollAreaScrollbar>

            <ScrollAreaScrollbar
                className="flex touch-none select-none bg-light-neutral-10 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-light-neutral-20 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                orientation="horizontal"
            >
                <ScrollAreaThumb className="relative flex-1 rounded-[10px] bg-light-neutral-50 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
            </ScrollAreaScrollbar>
        </ScrollArea>
    )
})