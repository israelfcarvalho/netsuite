'use client'

import React from "react"
import { CommandInput as CommandInputPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { CommandInputProps, CommandInputRef } from "./CommandInput.types"
import { CommandInputStyles } from "./CommandInput.styles"
import { cn } from "@workspace/ui/lib/utils"

export const CommandInput = React.forwardRef<CommandInputRef, CommandInputProps>(({ className, searchIcon, ...props }, ref) => {
    const {inputSearchStyle, inputStyleVariant} = CommandInputStyles
    
    const inputClassName = React.useMemo(() => inputStyleVariant({searchIcon}), [searchIcon])
    
    return (
      <div className="flex items-center border-b" cmdk-input-wrapper="">
        {!!searchIcon && (
          <Search className={inputSearchStyle} />
        )}
        
        <CommandInputPrimitive
          ref={ref}
          className={cn(
            className,
            inputClassName
          )}
          {...props}
        />
      </div>
    )
  })
  
  CommandInput.displayName = CommandInputPrimitive.displayName