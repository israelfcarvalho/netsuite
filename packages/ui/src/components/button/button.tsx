import React from "react"
import { ButtonProps } from "./button.types"
import { Slot } from '@radix-ui/react-slot'
import { buttonStyleVariants } from "./button.style"
import { cn } from "@workspace/ui/lib/utils"

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
      const Comp = asChild ? Slot : "button"
      return (
        <Comp
          className={cn(buttonStyleVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      )
    }
  )
  Button.displayName = "Button"