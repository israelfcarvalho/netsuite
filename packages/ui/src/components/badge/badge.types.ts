export type BadgeVariant = 'secondary' | 'destructive' | 'outline'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
}