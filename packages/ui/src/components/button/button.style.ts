import { tv } from "@workspace/ui/lib/utils"

export const buttonStyleVariants = tv({
    base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus:outline focus:outline-1 focus:outline-offset-1",
      variants: {
        variant: {
          default:
            "bg-light-brand-120 text-primary-foreground shadow hover:bg-light-brand-120/90 focus:outline-light-brand-120",
          destructive:
            "bg-destructive text- shadow-sm hover:bg-destructive/90 focus:outline-destructive",
          outline:
            "text-text-primary border-solid border border-light-enabled bg-transparent shadow-sm hover:bg-light-neutral-190/10",
          secondary:
            "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
          ghost: "hover:bg-light-neutral-50 hover:text-accent-foreground focus:outline-light-neutral-50",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "h-9 px-4 py-2",
          sm: "h-8 rounded-md px-3 text-xs",
          lg: "h-10 rounded-md px-8",
          icon: "h-9 w-9",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  )