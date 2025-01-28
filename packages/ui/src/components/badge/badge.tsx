import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

import { badgeVariants } from "./badge.styles"
import { BadgeProps } from "./badge.types"

export const Badge: React.FC<BadgeProps> = ({ 
  className, 
  variant, 
  ...props 
}) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}