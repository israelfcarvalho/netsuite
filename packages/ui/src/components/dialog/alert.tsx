'use client'

import * as DialogAlertPrimitives from '@radix-ui/react-alert-dialog'
import React, { Fragment, useState } from "react";
import { Button } from '../button';

export interface DialogAlertProps {
    message: string[]
    title?: string
    onClose: VoidFunction
	automaticColumns?: {
		enable: true
		rowsLimit: number
	}
}

export const DialogAlert: React.FC<DialogAlertProps> = ({
    message,
    title,
    onClose,
	automaticColumns
}) => {
    const [open, setOpen] = useState(true)

    const handleOpenChange = () => {
        open && onClose()
        setOpen(!open)
    }

    return(
	    <DialogAlertPrimitives.Root open={open} onOpenChange={handleOpenChange}>
	    	<DialogAlertPrimitives.Portal>
	    		<DialogAlertPrimitives.Overlay className="z-[60] fixed inset-0 bg-light-neutral-100/30 data-[state=open]:animate-overlayShow" />
	    		<DialogAlertPrimitives.Content
                    className="z-[60] overflow-hidden fixed left-1/2 top-1/2 max-h-[85vh] sm:min-w-96 w-fit max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-light-neutral-10 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow"
                >
	    			<DialogAlertPrimitives.Title className="py-4 px-10 bg-light-brand-120 m-0 text-[17px] font-sm font-semibold text-light-neutral-10 ">
	    				{title}
	    			</DialogAlertPrimitives.Title>
					<div className='min-w-max w-full grid grid-cols-1'>
						<DialogAlertPrimitives.Description 
							className="w-fit inline-grid gap-x-16 py-4 px-10 text-light-danger-120/80 mb-5 mt-[15px] text-[15px] leading-normal text-mauve11"
							style={{gridTemplateColumns: automaticColumns?.enable ? `repeat(${Math.ceil(message.length / automaticColumns.rowsLimit)}, auto)` : '1fr'}}
						>
								{message.map((msg, index) => (
									<Fragment key={index}>
										<span>{msg}</span>
									</Fragment>
								))}
	    				</DialogAlertPrimitives.Description>
					</div>
	    			<div className="w-full pb-4 px-10 flex justify-center gap-[25px]">
	    				<DialogAlertPrimitives.Action asChild>
	    					<Button className='w-full'>
	    						Ok
	    					</Button>
	    				</DialogAlertPrimitives.Action>
	    			</div>
	    		</DialogAlertPrimitives.Content>
	    	</DialogAlertPrimitives.Portal>
	    </DialogAlertPrimitives.Root>
    )
}
