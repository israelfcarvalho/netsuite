import { Slot } from "@radix-ui/react-slot"

type ButtonVariant = 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
type ButtonType = 'sm' | 'lg' | 'icon'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: ButtonVariant
  size?: ButtonType
}

export type Wrapper = typeof Slot | Extract<keyof HTMLElementTagNameMap, 'button' | 'a'>