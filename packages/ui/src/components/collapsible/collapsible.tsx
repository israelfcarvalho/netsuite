'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'
import React, { useCallback, useState } from 'react'

import { cn } from '@workspace/ui/lib/utils'
import './collapsible.css'
import { CollapsibleProps } from './collapsible.styles'

export const Collapsible: React.FC<CollapsibleProps> = ({
    children, 
    title,
    initialState = 'closed',
    onOpenChange
}) => {
    const [open, setOpen] = useState(initialState === 'open')
    const [nextOpen, setNextOpen] = useState(!(initialState === 'open'))
    
    const handleOpenChange = useCallback((open: boolean) => {
        setOpen(open)
        onOpenChange?.(open)
    }, [onOpenChange])

    const handleConlapseContentEnd = () => {
        setNextOpen(!open)
    }

    return (
        <CollapsiblePrimitive.Root
            className='bg-light-neutral-20 shadow-[0_0_4px_1px] shadow-light-neutral-60 p-4 rounded-md'
            open={open} 
            onOpenChange={handleOpenChange}
        >
            <div className={cn('flex items-center gap-4 mb-4', {'mb-0': !open})}>
                <CollapsiblePrimitive.Trigger
                    className={cn(
                        'transition-all',
                        {'rotate-0': open, '-rotate-90': !open},
                    )}
                    onClick={() => setOpen(!open)}
                >
                    <ChevronDown />
                </CollapsiblePrimitive.Trigger>

                <h2 className='font-semibold'>{title}</h2>
            </div>

            <CollapsiblePrimitive.Content
                onAnimationEnd={handleConlapseContentEnd}
                className={cn(
                    'CollapsibleContent',
                    {'!overflow-visible': !nextOpen && open}
                )}
            >
                {children}
            </CollapsiblePrimitive.Content>
            
        </CollapsiblePrimitive.Root>
    )
}