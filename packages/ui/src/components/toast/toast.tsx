import React from "react";
import * as ToastPrimitives from '@radix-ui/react-toast'

export const Toast: React.FC = () => {
    return (
        <ToastPrimitives.Provider>
            <ToastPrimitives.Root>
                <ToastPrimitives.Title></ToastPrimitives.Title>

                
            </ToastPrimitives.Root>
        </ToastPrimitives.Provider>
    )
}