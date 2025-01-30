import { cn } from "@workspace/ui/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-light-neutral-90/50", className)}
      {...props}
    />
  )
}

export { Skeleton }
