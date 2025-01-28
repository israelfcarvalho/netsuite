import React, { ComponentProps } from "react"

import { cn } from "@workspace/ui/lib/utils"
import { FormControl, FormField, FormLabel } from "@radix-ui/react-form"

interface TextAreaProps extends Omit<ComponentProps<'textarea'>, 'name'> {
  name: string
  label: string
}

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(({ className, label, name, ...props }, ref) => {
  return (
    <FormField name={name}>
      <FormLabel
          className="font-sans text-xs text-input-label font-semibold"
      >
          {label} 
          
          {props.required && <span className="ml-[2px] text-light-danger-120 text-base">*</span>}
      </FormLabel>

      <FormControl asChild>
        <textarea
          className={cn(
            "flex min-h-[100px] border-input-border border rounded-md w-full text-sm p-2 outline-input-border-selected",
            className
          )}
          ref={ref}
          {...props}
        />
      </FormControl>
    </FormField>
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
