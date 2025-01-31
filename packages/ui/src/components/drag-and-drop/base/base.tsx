"use client"

import { cn } from "@workspace/ui/lib/utils";
import React, { DragEventHandler, PropsWithChildren, useCallback, useState } from "react";

export enum DropZoneState {
    DRAGGINGOVER = 'dragging-over',
    STATIC = 'static'
}

interface DropZoneProps extends PropsWithChildren {
    onDragOver: DragEventHandler<HTMLDivElement>
    onDrop: DragEventHandler<HTMLElement>
    className?: string
}

export const DropZoneBase: React.FC<DropZoneProps> = ({
    onDragOver,
    onDrop,
    className,
    children
}) => {
    const [state, setState] = useState(DropZoneState.STATIC)

    const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault()
        onDragOver(event)
        setState(DropZoneState.DRAGGINGOVER)
    }

    const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault()
        onDrop(event)
        setState(DropZoneState.STATIC)
    }

    const handleDragLeave: DragEventHandler = (event) => {
        event.preventDefault()
        setState(DropZoneState.STATIC)
    }

    return (
        <div
            data-state={state}
            className={cn(
                'size-full',
                className
            )} 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
        >
            {children}
        </div>
    )
}