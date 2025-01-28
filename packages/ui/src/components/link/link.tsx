import { cn } from "@workspace/ui/lib/utils";
import React from "react";
import { LinkProps } from "./link.types";
import { Copy } from "lucide-react";
import { Button } from "../button";
import './link.css'

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({
    className, 
    children, 
    label,
    enableCopy,
    ...props
}, ref) => {

    const copyLinkToClipBoard = () => {
        navigator.clipboard.writeText(children);
    }

    return (
        <div className='inline-flex flex-nowrap gap-3 items-center'>
            <a 
                ref={ref}
                aria-label={label}
                className={cn(
                    'text-sm text-light-brand-120 underline-offset-4 decoration-2 hover:underline hover:font-semibold',
                    className,
                )} 
                {...props}
            >
                {children}
            </a>
            
            {enableCopy && (
                <Button
                className="p-0 h-min rounded-sm outline-light-brand-120 focus:text-light-brand-120"
                onClick={copyLinkToClipBoard}
                variant="ghost" 
                aria-label={`Copy ${label} link.`}
                >
                <Copy className="hover:text-light-brand-120 size-4 copy-icon"/>
                </Button>
            )}
        </div>
    )
})