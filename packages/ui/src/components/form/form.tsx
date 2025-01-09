import React from "react";
import { Form as FormPrimitive } from '@radix-ui/react-form'
import { ScrollArea, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from '@radix-ui/react-scroll-area'

import { FormProps } from "./form.types";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "../button/button";

export const Form: React.FC<FormProps> = ({ 
    children,
    title,
    subtitle
}) => {
    return (
        <FormPrimitive className="flex flex-col w-full h-full bg-light-neutral-00">
            <div className="py-4 px-6 bg-light-neutral-30">
                {!!title && <h2 className="text-xl font-bold">{title}</h2>}

                {!!subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}

                <div 
                    className={cn(
                        !!title || !!subtitle ? 'mt-3' : '',
                        'flex gap-4'
                    )}>
                    <Button type="submit">Save</Button>

                    <Button variant="outline">Cancel</Button>
                </div>
            </div>
            
            <ScrollArea className="flex-1 w-full bg-light-neutral-10 overflow-hidden">
                <ScrollAreaViewport className="size-full px-6 pt-4 pb-8">
                    {children}
                </ScrollAreaViewport>
                <ScrollAreaScrollbar
			        className="flex touch-none select-none bg-light-neutral-10 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-light-neutral-20 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
			        orientation="vertical"
		        >
			        <ScrollAreaThumb className="relative flex-1 rounded-[10px] bg-light-neutral-50 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
		        </ScrollAreaScrollbar>
            </ScrollArea>
        </FormPrimitive>
    )
}
