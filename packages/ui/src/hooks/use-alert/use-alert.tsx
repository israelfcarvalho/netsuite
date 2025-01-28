'use client'

import { DialogAlert, DialogAlertProps } from "@workspace/ui/components";
import React, { PropsWithChildren, useCallback, useMemo } from "react";

interface AlertState extends Pick<DialogAlertProps, 'automaticColumns'> {
    title?: string
    message: string[]
}

interface UseAlertContext {
    alert: (state: AlertState) => void
}

const useAlertContext = React.createContext<UseAlertContext | null>(null)

export const useAlert = () => {
    const context = React.useContext(useAlertContext)

    if (!context) {
        throw new Error('useAlert must be used within a AlertProvider')
    }

    return context
}



export const AlertProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [alert, setAlert] = React.useState<AlertState>({message: []})
    const [open, setOpen] = React.useState(false)

    const handleAlert = useCallback((state: AlertState) => {
        setAlert(state)
        setOpen(true)
    }, [])

    const contextValue = useMemo<UseAlertContext>(() => ({
        alert: handleAlert
    }), [handleAlert])

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <useAlertContext.Provider value={contextValue}>
            {children}
            {open && (
                <DialogAlert automaticColumns={alert.automaticColumns} message={alert.message} onClose={handleClose} title={alert.title}/>
            )}
        </useAlertContext.Provider>
    )
}