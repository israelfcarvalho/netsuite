export interface CollapsibleProps {
    children: React.ReactNode,
    title: string,
    initialState?: 'open' | 'closed'
    onOpenChange?: (open: boolean) => void
    className?: string
}