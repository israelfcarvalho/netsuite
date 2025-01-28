//TODO: It should be on service package
'use client'

import { api } from "@/services";
import { Button, Dialog, DialogClose, DialogContent, DialogPortal, DialogOverlay, DialogTitle, DialogDescription } from "@workspace/ui/components";
import React, { PropsWithChildren, useState } from "react";
import { useQuery } from "react-query";

interface TestConnection {
    status: 'success',
    message:"Connection is established"
}

async function testConnection(){
    return api
        .get<TestConnection>('/app/site/hosting/restlet.nl?script=customscript_cm_rt_connection_status&deploy=customdeploy_cm_rt_connection_status')
}

const useTestConnection = () => {
    const [isConnected, setIsConnected] = useState(true)

     useQuery({
        queryFn: testConnection,
        queryKey: ['netsuite-test-connection'],
        retryDelay: 3000,
        retry() {
            setIsConnected(false)
            return true
        },
        onSuccess(){
            setIsConnected(true)
        },
        refetchOnWindowFocus: true,
        refetchInterval: 20000
    })

    return {
        isConnected
    }
}

export const SessionProvider: React.FC<PropsWithChildren> = ({children}) => {
    const { isConnected } = useTestConnection()

    const login = () => {
        window.open('/app/login/secure/enterpriselogin.nl', '_blank')
    }

    return (
        <>
            {children}
            {!isConnected && (
                <Dialog open>
                    <DialogPortal>
                        <DialogOverlay className="bg-light-brand-120/80"/>
                        <DialogContent className="text-light-neutral-190 p-10 w-fit">
                            <DialogTitle className="bold text-3xl">You have been logged out.</DialogTitle>
                            <DialogDescription className="text-base">Click the button to log in again.</DialogDescription>
                            <Button aria-label="Login" onClick={login}>Login</Button>
                        </DialogContent>
                        <DialogClose aria-label="Close" className="hidden"/>
                    </DialogPortal>
                </Dialog>
            )}
        </>
    )
}