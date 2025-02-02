'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { cn } from '@workspace/ui/lib/utils'
import styles from './collapsible.module.css' 
import { CollapsibleProps } from './collapsible.styles'

export const Collapsible: React.FC<CollapsibleProps> = ({
    children, 
    title,
    initialState = 'closed',
    onOpenChange
}) => {
    const childrenContainerRef = useRef<HTMLDivElement>(null)
    const [contentHeight, setContentHeight] = useState('fit-content')
    const [open, setOpen] = useState(initialState === 'open')
    const [nextOpen, setNextOpen] = useState(!(initialState === 'open'))
    
    const handleOpenChange = useCallback((open: boolean) => {
        setOpen(open)
        onOpenChange?.(open)
    }, [onOpenChange])

    const handleConlapseContentEnd = () => {
        setNextOpen(!open)
    }

    useEffect(() => {
        if(childrenContainerRef.current){
        }
    }, [])

    useLayoutEffect(() => {
        if(childrenContainerRef.current){
            const height = childrenContainerRef.current?.offsetHeight
            setContentHeight(`${height}px`)
        }
    }, [children])

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
                    styles.CollapsibleContent,
                    {'!overflow-visible': !nextOpen && open}
                )}
                style={{'--radix-collapsible-content-height': contentHeight} as any}
            >
                <div ref={childrenContainerRef} className='h-fit'>
                    {children}
                </div>
            </CollapsiblePrimitive.Content>
            
        </CollapsiblePrimitive.Root>
    )
}