import React from "react"
import { ButtonProps } from "./button.types"
import { Slot } from '@radix-ui/react-slot'
import { buttonStyleVariants } from "./button.style"
import { cn } from "@workspace/ui/lib/utils"



export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, type = 'button', ...props }, ref) => {
      const Wrapper = asChild ? Slot : variant === 'link' ? 'button' : 'button'
      return (
        <Wrapper
          className={cn(buttonStyleVariants({ variant, size, className }))}
          ref={ref}
          type={type}
          {...props}
        />
      )
    }
  )

  Button.displayName = "Button"