import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'
import React, { useEffect } from 'react'

import { cn } from '@workspace/ui/lib/utils'
import './collapsible.css'

export interface CollapsibleProps {
    children: React.ReactNode,
    title: string,
    initialState?: 'open' | 'closed'
}

export const Collapsible: React.FC<CollapsibleProps> = ({
    children, 
    title,
    initialState = 'closed'
}) => {
    const [open, setOpen] = React.useState(initialState === 'open' ? true : false)
    
    return (
        <CollapsiblePrimitive.Root open={open} onOpenChange={setOpen}>
            <div className='flex items-center gap-4 mb-4'>  
                <CollapsiblePrimitive.Trigger
                    className={cn(
                        'transition-all',
                        {'rotate-0': open, '-rotate-90': !open},
                    )}
                    onClick={() => setOpen(!open)}
                >
                    <ChevronDown />
                </CollapsiblePrimitive.Trigger>

                <h2>{title}</h2>
            </div>

            <CollapsiblePrimitive.Content 
                className='CollapsibleContent'
            >
                {children}
            </CollapsiblePrimitive.Content>
            
        </CollapsiblePrimitive.Root>
    )
}